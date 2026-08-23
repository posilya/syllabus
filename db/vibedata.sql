-- ============================================
-- Справочники
-- ============================================

INSERT INTO public.disciplines (discipline_name, short_name) VALUES
    ('Математика',        'Матем'),
    ('Русский язык',      'Рус.яз'),
    ('Физика',            'Физ'),
    ('История',           'Ист'),
    ('Английский язык',   'Англ'),
    ('Информатика',       'Информ');

INSERT INTO public.teachers (first_name, last_name, patronymic) VALUES
    ('Ольга',    'Смирнова',   'Ивановна'),
    ('Дмитрий',  'Кузнецов',   'Александрович'),
    ('Елена',    'Попова',     'Сергеевна'),
    ('Андрей',   'Волков',     'Николаевич'),
    ('Мария',    'Соколова',   'Петровна'),
    ('Игорь',    'Морозов',    'Дмитриевич');

INSERT INTO public.study_groups (group_name, short_name, course) VALUES
    ('Группа 101', '101',  1),
    ('Группа 102', '102',  1),
    ('Группа 201', '201',  2),
    ('Группа 301', '301',  3);

INSERT INTO public.auditoriums (auditorium_number, floor) VALUES
    ('101', 1),
    ('102', 1),
    ('205', 2),
    ('210', 2),
    ('305', 3);

-- ============================================
-- Расписание на 1–19 сентября 2026 (будни, 4 пары в день)
-- ============================================

WITH date_range AS (
    SELECT d::date AS lesson_date
    FROM generate_series('2026-09-01'::date, '2026-09-19'::date, '1 day') AS d
    WHERE EXTRACT(ISODOW FROM d) BETWEEN 1 AND 5   -- только Пн–Пт
),
time_slots (slot_num, time_start, time_end) AS (
    VALUES
        (1, '08:30'::time, '09:15'::time),
        (2, '09:25'::time, '10:10'::time),
        (3, '10:30'::time, '11:15'::time),
        (4, '11:25'::time, '12:10'::time)
),
groups_cnt AS (SELECT count(*)::int AS n FROM public.study_groups),
disc_cnt   AS (SELECT count(*)::int AS n FROM public.disciplines),
teach_cnt  AS (SELECT count(*)::int AS n FROM public.teachers),
aud_cnt    AS (SELECT count(*)::int AS n FROM public.auditoriums)
INSERT INTO public.lessons_schedule
    (study_group_id, teacher_id, discipline_id, auditorium_id,
     lesson_description, lesson_date, time_start, time_end)
SELECT
    g.id,
    (SELECT id FROM public.teachers
       ORDER BY id
       LIMIT 1 OFFSET ((g.id + ts.slot_num + EXTRACT(DOY FROM dr.lesson_date)::int)
                        % (SELECT n FROM teach_cnt))),
    (SELECT id FROM public.disciplines
       ORDER BY id
       LIMIT 1 OFFSET ((g.id + ts.slot_num + EXTRACT(DOY FROM dr.lesson_date)::int)
                        % (SELECT n FROM disc_cnt))),
    (SELECT id FROM public.auditoriums
       ORDER BY id
       LIMIT 1 OFFSET ((g.id + ts.slot_num) % (SELECT n FROM aud_cnt))),
    NULL,
    dr.lesson_date,
    ts.time_start,
    ts.time_end
FROM date_range dr
CROSS JOIN public.study_groups g
CROSS JOIN time_slots ts
ORDER BY dr.lesson_date, g.id, ts.slot_num;

-- ============================================
-- Дополнительные "особые" занятия с NULL-полями
-- ============================================

-- 1. Группе не назначили преподавателя (teacher_id = NULL)
INSERT INTO public.lessons_schedule
    (study_group_id, teacher_id, discipline_id, auditorium_id,
     lesson_description, lesson_date, time_start, time_end)
VALUES
    (1, NULL, 3, 3, 'Физика — преподаватель ещё не назначен',
     '2026-09-02', '12:20', '13:05'),
    (2, NULL, 5, 4, 'Английский язык — замена, преподаватель уточняется',
     '2026-09-09', '12:20', '13:05');

-- 2. Преподавателю ещё не подобрали группу (study_group_id = NULL)
INSERT INTO public.lessons_schedule
    (study_group_id, teacher_id, discipline_id, auditorium_id,
     lesson_description, lesson_date, time_start, time_end)
VALUES
    (NULL, 4, 4, 2, 'История — резервный слот, группа не определена',
     '2026-09-03', '13:15', '14:00'),
    (NULL, 6, 6, 1, 'Информатика — резервный слот, группа не определена',
     '2026-09-16', '13:15', '14:00');

-- 3. Занятие в онлайне — без аудитории (auditorium_id = NULL)
INSERT INTO public.lessons_schedule
    (study_group_id, teacher_id, discipline_id, auditorium_id,
     lesson_description, lesson_date, time_start, time_end)
VALUES
    (3, 2, 2, NULL, 'Русский язык — занятие онлайн (Zoom)',
     '2026-09-04', '09:25', '10:10'),
    (4, 5, 1, NULL, 'Математика — занятие онлайн (Zoom)',
     '2026-09-11', '10:30', '11:15'),
    (1, 1, 3, NULL, 'Физика — занятие онлайн (Zoom)',
     '2026-09-18', '11:25', '12:10');

-- 4. Только предмет известен: ни преподавателя, ни аудитории, ни группы ещё нет
INSERT INTO public.lessons_schedule
    (study_group_id, teacher_id, discipline_id, auditorium_id,
     lesson_description, lesson_date, time_start, time_end)
VALUES
    (NULL, NULL, 2, NULL, 'Русский язык — плейсхолдер в расписании, детали не определены',
     '2026-09-17', '14:10', '14:55');
