-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public."User" (id, email, name, image, "createdAt", "updatedAt")
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'full_name', 'Unknown'),
    new.raw_user_meta_data->>'avatar_url',
    now(),
    now()
  );
  return new;
end;
$$;

-- Create a trigger that calls the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
