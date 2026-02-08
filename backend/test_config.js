require('dotenv').config();
console.log("Loading supabase config...");
try {
    const supabase = require('./config/supabase');
    console.log("Supabase loaded:", !!supabase);
} catch (e) {
    console.error("Failed to load supabase config:", e.message);
}
