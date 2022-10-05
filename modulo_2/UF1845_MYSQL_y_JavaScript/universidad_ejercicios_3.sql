use universidad;


select fecha_nacimiento into @fecha_nacimiento from alumnos where id = 1;
select floor(datediff(CURRENT_DATE, @fecha_nacimiento)/365.25);


delimiter $$
CREATE DEFINER=`root`@`localhost` FUNCTION `calcularEdad` (`idToEvaluate` INT(5)) RETURNS INT(4)  begin 
select fecha_nacimiento into @fecha_nacimiento from alumnos where id = idToEvaluate;
return floor(datediff(CURRENT_DATE, @fecha_nacimiento)/365.25);
end$$