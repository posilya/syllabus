SELECT
	*,
	sg.group_name,
	sg.short_name AS group_short_name,
	CONCAT_WS(' ', t.last_name, t.first_name, t.patronymic) AS teacher
FROM public.lessons_schedule AS ls
LEFT JOIN public.study_groups AS sg ON ls.study_group_id = sg.id
LEFT JOIN public.teachers AS t ON ls.teacher_id = t.id
WHERE
	ls.study_group_id = $1 AND
	lesson_date BETWEEN $2 AND $3;
