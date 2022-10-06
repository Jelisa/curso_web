/* 3.	Función para obtener el profesor (nombre, apellidos y asignatura ) con más alumnos 
por año y sexo (serán los parámetros). Se llamará fu_profesor:
La respuesta será : “El profesor nombre_profesor apellido_profesor ha tenido Y alumnas y X alumnos en XXXX”. */
drop procedure if exists fu_profesor;
delimiter $$
create function fu_profesor(anyo int) returns varchar (150)
begin
	
    return concat_ws(" ", "El profesor", @nombre_completo, "ha tenido", @alumnas,
					"alumnas y", @alumnos, "alumnos en", anyo);
end $$
delimiter ;

select fu_profesor(2017);

select profesor.nombre, profesor.apellido1, asignatura.id, curso.anyo_inicio from profesor, curso_escolar as curso, asignatura 
	where 
		profesor.id_profesor = asignatura.id_profesor
		and 
		asignatura.curso = curso.id
        and
        curso.anyo_inicio = 2014;

select * from alumno_se_matricula_asignatura asma, persona, profesor, curso_escolar as curso, asignatura 
	where 
		asma.id_alumno = persona.id
		and
		profesor.id_profesor = asignatura.id_profesor
		and 
		asignatura.curso = curso.id
		and
		curso.anyo_inicio = 2014
		and
		id_asignatura in (select asignatura.id from profesor, curso_escolar as curso, asignatura 
					where 
						profesor.id_profesor = asignatura.id_profesor
						and 
						asignatura.curso = curso.id)
			;
            
select profesor.nombre, profesor.apellido1, asignatura.id, curso.anyo_inicio from profesor, curso_escolar as curso, asignatura 
	where 
		profesor.id_profesor = asignatura.id_profesor
		and 
		asignatura.curso = curso.id
        and
        curso.anyo_inicio = 2014;