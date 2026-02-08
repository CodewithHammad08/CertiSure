-- Trigger Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, role, name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'role',
    new.raw_user_meta_data ->> 'name'
  );
  return new;
end;
$$;

-- Trigger to execute the function on new auth.users insert
-- Drop if exists to avoid errors on re-run
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- Ensure RLS on profiles allows the trigger (Security Definer handles it, but good to be clean)
-- Also ensure the service role or postgres has bypass, which is default.
