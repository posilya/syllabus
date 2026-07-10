SELECT
	id,
	group_name,
	short_name,
	course
FROM public.study_groups
ORDER BY course, short_name;
