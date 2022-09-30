drop database if exists test;
 create database test;
use test;

drop procedure if exists mayor_de_dos_nums;
delimiter //
create procedure mayor_de_dos_nums(in n1 int, in n2 int, out mayor varchar(20))
begin
	if n1 > n2 then
    	set mayor = concat(n1, " es mayor que ", n2);
    elseif n1 < n2 then
		set mayor = concat(n2, " es mayor que ", n1);
	else 
		set mayor = "son iguales";
    end if;
end //
delimiter ;

call mayor_de_dos_nums(2,2,@resultado);
SELECT @resultado;

drop procedure if exists semaforo;
delimiter //
create procedure semaforo(in color varchar(5), out resultado varchar(50))
begin
	case color
		when "rojo" then 
			set resultado = "no puedes pasar";
		when "ambar" then 
			set resultado = "precaución";
		when "verde" then 
			set resultado = "puedes pasar";
		else
			set resultado = "color incorrecto";
	end case;
end //
delimiter ;


call semaforo("VerdE", @resultado);
select @resultado;

drop procedure if exists test_telefono;
delimiter //
create procedure test_telefono(in num_tele char(12))
begin
	declare prefijo char(3);
    set prefijo = substr(num_tele, 1,3);
    case prefijo
		when "+34" then 
			select "número correcto";
		else 
			select "Número incorrecto";
    end case;
end //
delimiter ;

call test_telefono("+3466400987");


drop procedure if exists test_fin_semana;
delimiter //
create procedure test_fin_semana(in dia varchar(12))
begin
	case
		when dia = "Sábado" or dia = "Domingo" then
			select "es fin de semana";
		when dia in ("lunes", "martes", "miercoles") then 
			select  "es entre semana";
		else
			select "valor incorrecto";
    end case;
end //
delimiter ;

call test_fin_semana("lunes");