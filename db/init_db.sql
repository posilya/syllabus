-- Список дисциплин
CREATE TABLE IF NOT EXISTS public.disciplines (
    id               serial PRIMARY KEY,
    discipline_name text   NOT NULL,     -- название дисциплины
    short_name       text                -- сокращённое название
);

-- Список преподавателей
CREATE TABLE IF NOT EXISTS public.teachers (
    id         serial PRIMARY KEY,
    first_name text   NOT NULL,    -- имя преподавателя
    last_name  text,               -- фамилия
    patronymic text                -- отчество
);

-- Список групп (классов)
CREATE TABLE IF NOT EXISTS public.study_groups (
    id         serial   PRIMARY KEY,
    group_name text     NOT NULL,    -- название/номер группы
    short_name text,                 -- сокращённое название группы
    course     smallint NOT NULL     -- номер курса
);

-- Список аудиторий (кабинетов)
CREATE TABLE IF NOT EXISTS public.auditoriums (
    id                serial   PRIMARY KEY,
    auditorium_number text     NOT NULL,    -- номер кабинета
    floor             smallint              -- номер этажа
);

-- Расписание занятий
CREATE TABLE IF NOT EXISTS public.lessons_schedule (
    id             serial  PRIMARY KEY,
    study_group_id integer,             -- тут всё не обязательно для случаев,
    teacher_id     integer,             -- когда группе не назначили преподавателя или предмет,
    discipline_id  integer,             -- или преподавателю пока не знают, какую группу поставить,
    auditorium_id  integer,             -- или занятие будет в онлайне, и аудиторию тут не указать
    description    text
);
