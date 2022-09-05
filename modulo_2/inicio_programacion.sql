drop schema if exists test;
create schema test;
use test;
drop procedure if exists mayor_edad_param;
delimiter //
create procedure mayor_edad_param(in edad int)
begin
	if edad < 18 then
		select "Eres menor de edad";
	else
		select "Eres mayor de edad";
	end if;
end //
delimiter ;

call mayor_edad_param(18);

-- Otra manera de declarar variables
drop procedure if exists variables;
delimiter $$
create procedure variables()
begin
declare dato int default 0;
declare nombre varchar(5);
declare si boolean;

end$$
