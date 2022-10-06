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

        
        
        