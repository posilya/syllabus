SELECT
	ls.id AS lesson_schedule_id,
	t.id  AS teacher_id,     -- TODO Уточнить, норм ли брать id
	a.id  AS auditorium_id,  --      из правых таблиц?
	ls.lesson_date,
	ls.time_start,
	ls.time_end,
	a.auditorium_number,
	a.floor AS auditorium_floor,
	CONCAT_WS(' ', t.last_name, t.first_name, t.patronymic) AS teacher_name
FROM public.lessons_schedule AS ls
-- LEFT JOIN public.study_groups AS sg ON ls.study_group_id = sg.id
LEFT JOIN public.teachers AS t ON ls.teacher_id = t.id
LEFT JOIN public.auditoriums AS a ON ls.auditorium_id = a.id
WHERE
	ls.study_group_id = $1 AND
	lesson_date BETWEEN $2 AND $3
ORDER BY
	ls.lesson_date ASC,
	ls.time_start  ASC NULLS FIRST,
	ls.time_end    ASC NULLS FIRST;
