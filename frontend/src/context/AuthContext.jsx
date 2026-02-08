/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check active session
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session?.user) {
          await fetchProfile(session.user.id, session.user.email);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("Auth session check failed:", err);
        setLoading(false);
      }
    };

    getSession();

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await fetchProfile(session.user.id, session.user.email);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId, email) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (data) {
        setUser({ ...data, email }); // Combine profile and auth email
      } else if (error && error.code !== 'PGRST116') {
        console.error("Error fetching profile:", error);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    
    if (data.user) {
        // Manually fetch profile to ensure user state is set before navigation
        await fetchProfile(data.user.id, data.user.email);
    }
    return data;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const register = async (email, password, role, name) => {
    // 1. Sign Up with Metadata
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          name
        }
      }
    });

    if (error) throw error;

    // The profile will be created automatically by the Postgres Trigger (see setup_triggers.sql)
    
    if (data.user) {
      // Manually set user state optimistically, though onAuthStateChange will also fire
      // Note: If email confirmation is required, session might be null, but that's okay.
      setUser({ id: data.user.id, email, role, name });
    }
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
