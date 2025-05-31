alter table objects enable row level security;

create policy "Admins can manage their own objects"
on objects
for all
using (auth.uid() = owner_user_id)
with check (auth.uid() = owner_user_id);