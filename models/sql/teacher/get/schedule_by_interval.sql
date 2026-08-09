SELECT
	ls.id AS lesson_schedule_id,
	g.id  AS group_id,      -- TODO Уточнить, норм ли брать id
	a.id  AS auditorium_id, --      из правых таблиц?
	d.id  AS discipline_id,
	to_char(ls.lesson_date, 'DD.MM.YYYY') AS lesson_date,
	to_char(ls.time_start, 'HH24:MI') AS time_start,
	to_char(ls.time_end, 'HH24:MI') AS time_end,
	a.auditorium_number,
	a.floor AS auditorium_floor,
	d.discipline_name,
	COALESCE(g.short_name, g.group_name) AS group_name
FROM public.lessons_schedule AS ls
LEFT JOIN public.study_groups AS g ON ls.study_group_id = g.id
LEFT JOIN public.auditoriums AS a ON ls.auditorium_id = a.id
LEFT JOIN public.disciplines AS d ON ls.discipline_id = d.id
WHERE
	ls.teacher_id = $1 AND
	lesson_date BETWEEN $2 AND $3
ORDER BY
	ls.lesson_date ASC,
	ls.time_start  ASC NULLS FIRST,
	ls.time_end    ASC NULLS FIRST;
