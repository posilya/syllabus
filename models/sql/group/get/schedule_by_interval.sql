SELECT
	ls.id AS lesson_schedule_id,
	t.id  AS teacher_id,     -- TODO Уточнить, норм ли брать id
	a.id  AS auditorium_id,  --      из правых таблиц?
	to_char(ls.lesson_date, 'DD.MM.YYYY') AS lesson_date,
	to_char(ls.time_start, 'HH24:MI') AS time_start,
	to_char(ls.time_end, 'HH24:MI') AS time_end,
	a.auditorium_number,
	a.floor AS auditorium_floor,
	CONCAT_WS(' ', t.last_name, t.first_name, t.patronymic) AS teacher_name
FROM public.lessons_schedule AS ls
LEFT JOIN public.teachers AS t ON ls.teacher_id = t.id
LEFT JOIN public.auditoriums AS a ON ls.auditorium_id = a.id
WHERE
	ls.study_group_id = $1 AND
	lesson_date BETWEEN $2 AND $3
ORDER BY
	ls.lesson_date ASC,
	ls.time_start  ASC NULLS FIRST,
	ls.time_end    ASC NULLS FIRST;
