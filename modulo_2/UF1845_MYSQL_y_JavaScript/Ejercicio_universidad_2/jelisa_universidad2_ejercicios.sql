use jelisa_universidad;
-- BLOQUE 1
/* 1.	Lista de profesores ordenados alfabéticamente. */
select * from profesor order by apellido1;

/* 2.	Lista de alumnos ordenados por ciudad y por apellido, alfabéticamente. */
select * from profesor order by ciudad, apellido1;

/* 3.	Lista de alumnos solo de Barcelona, alfabéticamente en sentido descendente. */
select * from profesor where ciudad = "barcelona" order by apellido1 desc;

/* 4.	Lista de alumnos no matriculados en ninguna asignatura: 
nif, nombre, apellido1 */
select nif, nombre, apellido1 from persona where id not in (select distinct id_alumno from alumno_se_matricula_asignatura);

/* 5.	Alumno hombre más joven matriculado en 2017: 
nombre, apellido1 (atención, que hay personas no matriculadas) */
select nombre, apellido1 from persona 
	where
		id in (select id_alumno from alumno_se_matricula_asignatura as asig, curso_escolar as curso where
				asig.id_curso_escolar = curso.id and curso.anyo_inicio = 2017)  
		and 
		fecha_nacimiento = (select max(fecha_nacimiento) from persona);
-- este nos devuelve todas las personas que tengan el mismo cumpleaños y por tanto son las más jovenes.
-- alternativamente si solo queremos uno podemos hacer
select nombre, apellido1 from persona 
	where
		id in (select id_alumno from alumno_se_matricula_asignatura as asig, curso_escolar as curso where
				asig.id_curso_escolar = curso.id and curso.anyo_inicio = 2017)  
	order by fecha_nacimiento desc limit 1;

/* 6.	Profesor de más edad que dio cursos en 2018 */
select nombre, apellido1 from profesor 
	where
		id in (select id_profesor from asignatura as asig, curso_escolar as curso where
				asig.curso = curso.id and curso.anyo_inicio = 2018)  
		and 
			fecha_nacimiento = (select min(fecha_nacimiento) from profesor where fecha_nacimiento != "0000-00-00");

/* 7.	Asignatura con más alumnos por año */
/*select nombre from asignatura
	where 
		id = (select id_asignatura, count(*) as matriculados from alumno_se_matricula_asignatura group by id_asignatura order by matriculados desc limit 1);
*/
select asignatura.nombre, count(*) as matriculados 
	from alumno_se_matricula_asignatura as alumnos, asignatura
    where asignatura.id = alumnos.id_asignatura
	group by alumnos.id_asignatura 
    order by matriculados desc 
    limit 1;

/* 8.	Asignatura con más alumnos mujeres y cuantas son */
select asignatura.nombre, count(*) as matriculados 
	from alumno_se_matricula_asignatura as alumnos, asignatura, persona
    where 
		asignatura.id = alumnos.id_asignatura
        and 
        alumnos.id_alumno = persona.id
		and
        persona.sexo = "M"
	group by alumnos.id_asignatura 
    order by matriculados desc
    limit 1;

/* 9.	Asignatura con menos alumnos hombres en 2018 */
select asignatura.nombre, count(*) as matriculados 
	from alumno_se_matricula_asignatura as alumnos, asignatura, persona
    where 
		asignatura.id = alumnos.id_asignatura
        and 
        alumnos.id_alumno = persona.id
		and
        persona.sexo = "H"
	group by alumnos.id_asignatura 
    order by matriculados asc
    limit 1;

/* 10.	10 nombres de alumnos más usuales, ordenados de mayor a menor */
select nombre, count(*) as repes from persona group by nombre order by repes desc limit 10;

/* 11.	Ciudad con más alumnos hombres en 2016: ciudad, cantidad de alumnos */
select ciudad, count(*) as num_males from persona 
	where 
		sexo  = "M" 
	and
		id in (select distinct asma.id_alumno from alumno_se_matricula_asignatura as asma, curso_escolar 
				where asma.id_curso_escolar = curso_escolar.id and curso_escolar.anyo_inicio = 2016)
	group by ciudad
    order by num_males desc
    limit 1;

/* 12.	Las tres asignaturas con mayor número de alumnos inscritos en toda la historia de más a menos, indicando la cantidad: 
Nombre de la asignatura, cantidad de alumnos */
select asignatura.nombre, count(asma.id_asignatura) as num_alumnos from alumno_se_matricula_asignatura as asma, asignatura 
	where 
		asma.id_asignatura = asignatura.id 
	group by asignatura.nombre
    order by num_alumnos desc 
    limit 3;

/* 13.	Se ha decidido conceder una beca a los tres alumnos casados de mayor edad.
	Identifica quienes son, mostrando su nif, nombre y apellido1. */
select nif, nombre, apellido1 from persona 
	where casado = "S" and fecha_nacimiento != "0000-00-00"
    order by fecha_nacimiento
    limit 3;

/* 14.	Mostrar por parejas los alumnos que viven en la misma ciudad.
	Deben aparecer los apellidos de cada uno y la ciudad, sin parejas duplicadas.
    El orden debe ser por el nombre de la ciudad y el apellido de la primera columna. */

select distinct *from persona as p1
	join persona as p2
		on p1.ciudad = p2.ciudad
    order by p1.ciudad;

/* 15.	Gestión de usuarios. Has de guardar de código de cada acción: */
	/* 	a.	Muestra los usuarios y sus permisos. */
    select * from mysql.user;
	/*	b.	Crea un usuario llamado cliente que solo se pueda conectar por localhost y permisos para hacer select y update.
			Su contraseña será ‘1234abcd’. */
		create user cliente@localhost identified by "1234abcd";
        grant usage, select, update on jelisa_universidad.* to cliente@localhost;
	/* 	c.	Quítale el permiso de update.  */
        revoke update on jelisa_universidad.* from cliente@localhost;
	/* 	d.	Borra el usuario. */
		drop user cliente@localhost;
-- ---------------------------------------------------------------------------------------------------------
