SELECT
    group_name,
    short_name,
    course
FROM public.study_groups
WHERE id = $1;
