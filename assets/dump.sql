--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: songs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.songs (
    id integer NOT NULL,
    name text NOT NULL,
    "youtubeLink" text NOT NULL,
    score integer DEFAULT 0,
    "genresIds" integer
);


--
-- Name: songs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.songs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.songs_id_seq OWNED BY public.songs.id;


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: songs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs ALTER COLUMN id SET DEFAULT nextval('public.songs_id_seq'::regclass);


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.genres VALUES (1, 'samba');
INSERT INTO public.genres VALUES (2, 'forró');


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.songs VALUES (14, 'Vai malandra - Anitta', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 94, NULL);
INSERT INTO public.songs VALUES (5, 'Bohemian Rapsody - Queen', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 94, NULL);
INSERT INTO public.songs VALUES (6, 'Somebody to Love - Queen', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 9, NULL);
INSERT INTO public.songs VALUES (13, 'Bad romance - Lady Gaga', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 8, NULL);
INSERT INTO public.songs VALUES (15, 'Felices los 4 - Maluma', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', -2, NULL);
INSERT INTO public.songs VALUES (16, 'Hawaia - Maluma', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 10, NULL);
INSERT INTO public.songs VALUES (17, 'Sozinho - Caetano Veloso', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 10, NULL);
INSERT INTO public.songs VALUES (18, 'Petala - Djavan', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 6, NULL);
INSERT INTO public.songs VALUES (23, 'Desliga e Vem- Exaltasamba', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 36, NULL);
INSERT INTO public.songs VALUES (24, 'Ta vendo aquela lua - Exaltasamba', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 3, NULL);
INSERT INTO public.songs VALUES (12, 'Just dance - Lady Gaga', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 10, NULL);
INSERT INTO public.songs VALUES (19, 'Samurai - Djavan', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 103, NULL);
INSERT INTO public.songs VALUES (22, 'Que se chama amor - SPC', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 403, NULL);
INSERT INTO public.songs VALUES (29, 'Falamansa - Xote dos Milagres', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 0, 1);
INSERT INTO public.songs VALUES (1, 'A Million Dreams - Soundtrack', 'https://www.youtube.com/watch?v=z4cCYB9Ggq0&list=RDu04baUNhhy0&index=15', 11, NULL);
INSERT INTO public.songs VALUES (31, 'Falamansa - Xote dos Milagres', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 0, 1);
INSERT INTO public.songs VALUES (32, 'Falamansa - Xote dos Milagres', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 0, 2);
INSERT INTO public.songs VALUES (10, 'Irreplaceble - Beyonce', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 0, NULL);
INSERT INTO public.songs VALUES (7, 'Hammer to Fall - Queen', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 121, NULL);
INSERT INTO public.songs VALUES (9, 'Halo - Beyonce', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 91, NULL);
INSERT INTO public.songs VALUES (28, 'Lancinho - Turma do Pagode', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 87, NULL);
INSERT INTO public.songs VALUES (26, 'Dedinhos - Eliana', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 34, NULL);
INSERT INTO public.songs VALUES (25, 'Lua de Cristal - Xuxa', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 49, NULL);
INSERT INTO public.songs VALUES (21, 'Caraca Muleke - Thiaguinho', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 77, NULL);
INSERT INTO public.songs VALUES (11, 'Toxic - Britney Spears', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 42, NULL);
INSERT INTO public.songs VALUES (4, 'Falamansa - Xote dos Milagres', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 2, NULL);
INSERT INTO public.songs VALUES (27, 'Glamurosa - Mc Marcinho', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', -3, NULL);
INSERT INTO public.songs VALUES (20, 'Pnto Fraco - Thiaguinho', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 654, NULL);
INSERT INTO public.songs VALUES (8, 'Hight Hopes - Panic at the disco', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 84, NULL);
INSERT INTO public.songs VALUES (30, 'Falamansa - Xote dos Milagres', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 12, 2);
INSERT INTO public.songs VALUES (33, 'Falamansa - Xote dos Milagres', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 0, 2);
INSERT INTO public.songs VALUES (34, 'Falamansa - Xote dos Milagres', 'https://www.youtube.com/watch?v=chwyjJbcs1Y', 0, 1);


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.genres_id_seq', 2, true);


--
-- Name: songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.songs_id_seq', 34, true);


--
-- Name: genres genres_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pkey PRIMARY KEY (id);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

