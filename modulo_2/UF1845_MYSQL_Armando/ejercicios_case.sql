drop database if exists test;
create database test;
use test;

/* Ejercicio 1: Enviar a un procedimiento el número del día de la semana. Mostrar que día es. 
				Ejemplo: 1 -> Lunes */

drop procedure if exists week_day;
delimiter //
create procedure week_day(in dia int)
begin
	case dia
		when 1 then
			select "Lunes";
		when 2 then
			select "Martes";
        when 3 then
			select "Miercoles";
        when 4 then
			select "Jueves";
        when 5 then
			select "Viernes";
        when 6 then
			select "Sábado";
        when 7 then
			select "Domingo";
        else
			select "Input incorrecto";
	end case;
end//
delimiter ;

call week_day(4);

/* Ejercicio 2: Enviar a un procedimiento la edad de una persona. En función de esta mostrar: 
	- Si tiene 0 -> Acabas de nacer
	- Si tiene más de 0 y menos de 18 -> Eres menor de edad
	- Si tiene 18 o más y menos de 65 -> Eres mayor de edad
	- Si tiene más de 65 -> Ya puedes jubilarte. */

drop procedure if exists prueba_edad;
delimiter //
create procedure prueba_edad (in edad int)
begin
	case
		when edad = 0 then 
			select "Acabas de nacer";
		when edad > 0 AND edad < 18 then 
			select "Eres menor de edad";
		when edad >= 18 AND edad < 65 then
			select "Eres mayor de edad";
        when edad >= 65 then
			select "Ya puedes jubilarte";
        else
			select "Edad Incorrecta";
    end case;
end //
delimiter ;

call prueba_edad(15);

/* Ejercicio 3: Enviar a un procedimiento en qué planta se encuentra una persona: 0, 1, 2.
				Y también enviar cuántos pisos quiere subir/bajar: 1 o 2. Indicar en qué planta estará, 
				teniendo en cuenta que solo hay 3 plantas. */
drop procedure if exists elevator;
delimiter //
create procedure elevator(in planta_actual int, in movimiento int)
begin
	case
		when movimiento > 2 or movimiento < -2 or movimiento = 0 then
			select "Movimiento Incorrecto" as Error;
		WHEN  planta_actual > 2 or planta_actual < 0 then
			select "Planta Incorrecta" as Error;
		else
			case planta_actual 
				when 0 then 
					case movimiento 
						when +1 then
							select 1 as "Planta";
						when +2 then 
							select 2 as "Planta";
						else
							select "Movimiento Incorrecto" as Error;
					end case;
				when 1 then
					case movimiento
						when +1 then
							select 2 as "Planta";
						when -1 then 
							select 0 as "Planta";
						else
							select "Movimiento Incorrecto" as Error;
                    end case;
				when 2 then
					case movimiento
						when -1 then
							select 1 as "Planta";
						when -2 then
							select 0 as "Planta";
						else
							select "Movimiento Incorrecto" as Error;
					end case;
			end case;
	end case;
end //
delimiter ;

call elevator(2,0);

