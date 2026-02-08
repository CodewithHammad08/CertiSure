-- Create a table for public profiles (linked to auth.users)
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  role text check (role in ('user', 'institute', 'admin')),
  name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enabled Row Level Security (RLS)
alter table profiles enable row level security;

-- Create policies for profiles
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on profiles
  for update using (auth.uid() = id);

-- Create a table for certificates
create table certificates (
  id uuid default uuid_generate_v4() primary key,
  candidate_name text not null,
  course_name text not null,
  issue_date date not null,
  issuer_id uuid references profiles(id) not null,
  certificate_id text unique not null,
  status text default 'valid' check (status in ('valid', 'revoked')),
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for certificates
alter table certificates enable row level security;

-- Policies for certificates
create policy "Certificates are viewable by everyone" on certificates
  for select using (true);

create policy "Institutes can insert certificates" on certificates
  for insert with check (
    auth.uid() = issuer_id and 
    exists (select 1 from profiles where id = auth.uid() and role = 'institute')
  );
