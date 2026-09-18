INSERT INTO public.users (full_name, email, password_hash, superuser)
VALUES ($1, $2, $3, $4)
RETURNING id;
