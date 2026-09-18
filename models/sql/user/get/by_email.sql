SELECT
    id,
    full_name,
    email,
    password_hash,
    superuser
FROM public.users
WHERE email = $1;
