use universidad;
DELIMITER //
CREATE PROCEDURE ordenarAlumnosPorEdad()
BEGIN
select * from alumnos where fecha_nacimiento != '0000-00-00' order by fecha_nacimiento;
END //
DELIMITER ;

call ordenarAlumnosPorEdad();

DELIMITER //
drop function if exists mayoriaEdad;
CREATE function mayoriaEdad(idToEvaluate int(5)) returns varchar(50)
BEGIN
	set @output = null;
	select fecha_nacimiento into @fecha_nacimiento from alumnos 
		where
			id = idToEvaluate 
            and
            fecha_nacimiento != '0000-00-00' 
			and
			fecha_nacimiento is not null 
			and 
			fecha_nacimiento != "" 
		order by fecha_nacimiento;
	if (@fecha_nacimiento is not null and @fecha_nacimiento != "") then
		set @edad = calcularEdad(idToEvaluate);
		if (@edad < 18) then
			select concat_ws(" ", nombre, apellido1, "eres menor de edad") into @output from alumnos where id = idToEvaluate;
		else
			select concat_ws(" ", nombre, apellido1, "eres mayor de edad") into @output from alumnos where id = idToEvaluate;
		end if;
	end if;
    return @output;
END //
DELIMITER ;

select mayoriaEdad(32);
