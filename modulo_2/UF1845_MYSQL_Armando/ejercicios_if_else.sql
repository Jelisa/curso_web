drop database if exists test;
create database test;
use test;

drop table if exists letra;
create table letra(
	id int primary key auto_increment,
    resto int,
    letra char(1)
);
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('1', '0', 't');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('2', '1', 'r');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('3', '2', 'w');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('4', '3', 'a');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('5', '4', 'g');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('6', '5', 'm');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('7', '6', 'y');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('8', '7', 'f');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('9', '8', 'p');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('10', '9', 'd');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('11', '10', 'x');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('12', '11', 'b');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('13', '12', 'n');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('14', '13', 'j');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('15', '14', 'z');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('16', '15', 's');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('17', '16', 'q');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('18', '17', 'v');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('19', '18', 'h');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('20', '19', 'l');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('21', '20', 'c');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('22', '21', 'k');
INSERT INTO `test`.`letra` (`id`, `resto`, `letra`) VALUES ('23', '22', 'e');

/* Ejercicio 1 -> Enviar a un procedimiento el color del semáforo y mostrar si puede pasar, 
					extremar la precaución o no pasar.*/
 
drop procedure if exists semaforo;
delimiter //
create procedure semaforo(in color varchar(10))
begin
	if color = "rojo" then
		select "No pasar";
	elseif color = "ambar" or color = "amarillo" then
		select "Extremar la precaución";
	elseif color = "verde" then 
		select "Puede pasar";
	else
		select "Color incorrecto";
    end if;
end //
delimiter ;

call semaforo("amarillo");
 
/* Ejercicio 2 -> Enviar a un procedimiento un número. Mostrar si es par o impar*/
  
drop procedure if exists check_even_odd;
delimiter //
create procedure check_even_odd(in numero int)
begin
	if numero % 2 = 0 then
		select "Es un número par";
	else
		select "Es un número impar";
	end if;
end //
delimiter ;

call check_even_odd(18);

/* Ejercicio 3 -> Enviar a un procedimiento 3 números. Indicar si el tercero es la 
					suma de los dos primeros o no.*/
  
drop procedure if exists tercero_es_suma;
delimiter //
create procedure tercero_es_suma(in n1 int, in n2 int, in n3 int)
begin
	set @suma = n1 + n2;
    if n3 = @suma then
		select concat_ws(" ", n3, "es suma de", n1, "y", n2) as resultado;
	else
		select concat_ws(" ", n3, "NO es suma de", n1, "y", n2) as resultado;
    end if;
end //
delimiter ;

call tercero_es_suma(3,6,10);
 
/* Ejercicio 4 -> Enviar a un procedimiento un precio a pagar y el dinero disponible y 
					mostrar si le falta dinero, indicarle cuanto, si le sobra indicar 
                    cuánto y si esta justo mostrar gracias por la compra*/
   
drop procedure if exists comprobar_saldo;
delimiter //
create procedure comprobar_saldo(in precio float, in saldo float)
begin
	set @resultado = saldo - precio;
    if @resultado > 0 then
		select concat_ws(" ", "Le sobran", @resultado, "€") as respuesta;
	elseif @resultado < 0 then
		select concat_ws(" ", "Le faltan", abs(@resultado), "€") as respuesta;
	else
		select "Tiene el dinero justo" as respuesta;
    end if;
    
end //
delimiter ;

call comprobar_saldo(150, 150);
  
/* Ejercicio 5 -> Enviar a un procedimiento 3 números. Ordenar descendentemente.*/
  
drop procedure if exists ordena_tres_numeros;
delimiter //
create procedure ordena_tres_numeros(in n1 int, in n2 int, in n3 int)
begin
	if n1 >= n2 and n1 >= n3 then
		if n2 >= n3 then
			select concat_ws(", ", n1, n2, n3) as "numeros ordenados";
		else
			select concat_ws(", ", n1, n3, n2) as "numeros ordenados";
        end if;
	elseif n2 > n3 then
		select ('here');
		if n3 > n1 then
			select concat_ws(", ", n2, n3, n1) as "numeros ordenados";
        else 
			select concat_ws(", ", n2, n1, n3) as "numeros ordenados";
        end if;
	else 
		if n1 > n2 then
			select concat_ws(", ", n3, n1, n2) as "numeros ordenados";
        else 
			select concat_ws(", ", n3, n2, n1) as "numeros ordenados";
        end if;
    end if;
end //
delimiter ;
 
 call ordena_tres_numeros(9,9,9);

 
/* Ejercicio 6 -> Comprobar letra DNI. Enviar a un procedimiento el número del DNI.*/
 
drop procedure if exists check_dni;
delimiter //
create procedure check_dni(in dni char(9))
begin
	set @letra_dada = substr(dni,9);
	set @resto = cast(substr(dni,1,8) as double) % 23;
    set @letra_db = (select letra from letra where resto = @resto);
    if @letra_db = @letra_dada then
		select "DNI correcto";
	else
		select "DNI incorrecto";
    end if;
end //
delimiter ;

call check_dni("53186675B");

/* Ejercicio 7 -> Enviar a un procedimiento un día, mes, año (numéricos). 
					Comprobar que sean correctos. Dia 1-31, mes 1-12, año<=actual*/
 
drop procedure if exists check_date;
delimiter //
create procedure check_date(in dia int, in mes int, in anyo int)
begin
	if dia < 1 or dia > 31 or mes <1 or mes > 12 or anyo > 2022 then 
		select "Fecha incorrecta";
	else
		select "Fecha correcta";
    end if;
end //
delimiter ;

call check_date(4,-8,1989);
