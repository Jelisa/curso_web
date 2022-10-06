use jelisa_universidad;
-- ------------------ BLOQUE 1 -------------------------------------------------------------------------------------------------------
/* 1.	Lista de profesores ordenados alfabéticamente. */
select * from profesor order by apellido1;

/* 2.	Lista de alumnos ordenados por ciudad y por apellido, alfabéticamente. */
select * from profesor order by ciudad, apellido1;

/* 3.	Lista de alumnos solo de Barcelona, alfabéticamente en sentido descendente. */
select * from profesor where ciudad = "barcelona" order by apellido1 desc;

/* 4.	Lista de alumnos no matriculados en ninguna asignatura: 
nif, nombre, apellido1 */
select nif, nombre, apellido1 from persona 
	where id not in (select distinct id_alumno from alumno_se_matricula_asignatura);

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
		id = (select id_asignatura, count(*) as matriculados from alumno_se_matricula_asignatura 
				group by id_asignatura order by matriculados desc limit 1);
*/
select asignatura.nombre, count(*) as matriculados 
	from alumno_se_matricula_asignatura as alumnos, asignatura
    where asignatura.id = alumnos.id_asignatura
	group by alumnos.id_asignatura 
    order by matriculados desc 
    limit 1;

/* No funciona.
SELECT nombre
FROM
    (
        SELECT  asignatura.nombre as nombre, COUNT(alumnos.id_asignatura) as totalCount
		from alumno_se_matricula_asignatura as alumnos, asignatura
		where asignatura.id = alumnos.id_asignatura
		group by alumnos.id_asignatura 
    ) s
having totalCount = MAX(totalCount);*/

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

select distinct p1.apellido1, p2.apellido1, p1.ciudad from persona as p1
	join persona as p2
		on p1.ciudad = p2.ciudad
	where p1.apellido1 != p2.apellido1
    order by p1.ciudad, p1.apellido1;

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
-- -----------------------------------------------------------------------------------------------------------------------------------
-- ------------------ BLOQUE 2 -------------------------------------------------------------------------------------------------------

/* 1.	Procedimiento Almacenado para obtener la ciudad con más alumnos por año y sexo (serán los parámetros). 
Se llamará pa_ciudad_sexo_anyo: 
ciudad, cantidad de alumnos hombres, cantidad de mujeres, año */
delimiter $$
create function alumnos_asig_sexo_anyo_ciudad(sexoToLookFor char(1),  anyo int, ciudadToLookFor varchar(25)) returns int
begin
	select count(*) into @resultado from persona
		where 
			id in (select distinct asma.id_alumno from alumno_se_matricula_asignatura as asma, curso_escolar as curso
					where 
						asma.id_curso_escolar = curso.id 
						and 
						curso.anyo_inicio = anyo)
			and
			sexo = sexoToLookFor
			and 
			ciudad = ciudadToLookFor;
	return @resultado;
end $$
delimiter ; 
 
delimiter $$
create procedure pa_ciudad_sexo_anyo(in anyo year)
begin
	select ciudad, count(*) as matriculados into @ciudad, @total  from persona
	where id in (select distinct asma.id_alumno from alumno_se_matricula_asignatura as asma, curso_escolar as curso
					where 
						asma.id_curso_escolar = curso.id 
					and 
						curso.anyo_inicio = anyo)
	group by ciudad
    order by matriculados desc
    limit 1;
    
	select alumnos_asig_sexo_anyo_ciudad("M", anyo, @ciudad) into @mujeres;
	
   	select alumnos_asig_sexo_anyo_ciudad("H", anyo, @ciudad) into @hombres;

    
    select @ciudad, @hombres, @mujeres, anyo;
end $$
delimiter ;

/* 2.	Procedimiento almacenado para obtener los alumnos matriculados por asignatura, sexo y año de inicio (serán los parámetros). 
Se llamará pa_alumnos_asig_sexo_anyo. 
Por ejemplo, cuando tendrá esta respuesta cuando se ejecute así : 
call pa_alumnos_asig_sexo_anyo (‘Estadistica’, ‘M’, 2017): */

delimiter $$
create procedure pa_alumnos_asig_sexo_anyo(in asignatura varchar(100), sexo char(1),  anyo int)
begin
	select distinct p.nif, p.nombre, p.apellido1, p.sexo, asignatura.nombre, curso.anyo_inicio
		from persona as p, alumno_se_matricula_asignatura as asma, asignatura, curso_escolar as curso
		where
			p.id = asma.id_alumno
			and
			asma.id_curso_escolar = curso.id
			and 
			asignatura.id = asignatura.id
			and
			curso.anyo_inicio = anyo
			and 
			p.sexo = sexo
			and
			asignatura.nombre = asignatura;
end $$
delimiter ;

/* 3.	Función para obtener el profesor (nombre, apellidos y asignatura ) con más alumnos 
por año y sexo (serán los parámetros). Se llamará fu_profesor:
La respuesta será : “El profesor nombre_profesor apellido_profesor ha tenido Y alumnas y X alumnos en XXXX”. */


/* 4.	Crea un procedimiento para inscribir(que no matricular) alumnos, introduciendo todos los datos de la tabla “persona”. Se llamará pa_inscripcion(todos_los_datos):
Si se introduce un nif repetido debe de avisar del error.  */

/* 5.	Crea otro procedimiento para matricular alumnos a partir de su nif. Los parámetros serán nif, asignatura, año de inicio. 
Se llamará pa_matricula(nif, asignatura, anyo_inicio)
Si ya está matriculado de esa asignatura ese año debe avisar del error. */

/* 6.	Crea una función que muestre de qué asignaturas y en que año se ha matriculado un alumno. El parámetro de entrada será el nif. La salida debe mostrar nif, nombre, apellido1, asignatura, año de inicio. 
Se llamará fu_info_matriculas_alumno. */


