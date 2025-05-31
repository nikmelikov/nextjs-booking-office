create table objects (
  id uuid primary key default uuid_generate_v4(),
  owner_user_id uuid references auth.users not null,
  name text not null,
  address text,
  capacity int,
  created_at timestamp default now()
);