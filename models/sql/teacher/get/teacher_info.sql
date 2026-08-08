SELECT
	last_name,
	first_name,
	patronymic
FROM public.teachers
WHERE id = $1;
