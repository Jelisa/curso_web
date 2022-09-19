drop database if exists test;
create database test;
use test;

drop procedure if exists bucle_limite;
delimiter //
create procedure bucle_limite (in limite int)
begin
	-- init
    set @i = 1; -- lo mismo: declare i int default 1;
    -- comp
    while @i <= limite do
		select @i;
        set @i = @i +1; -- act
	end while;
    --
end //
delimiter ;

call bucle_limite(3);

/* Ejercicio 1: Enviar a un procedimiento un número. Mostrar todos los números pares en formato decreciente. */

DROP PROCEDURE IF EXISTS LoopDemo;
DELIMITER $$
CREATE PROCEDURE LoopDemo(in n int)
BEGIN
	DECLARE str  VARCHAR(500);
    declare counter int;
	IF  (n%2 = 0) THEN
        SET counter = n;
		SET  str = CONCAT("", counter);
	ELSE
		SET counter = n-1;
		SET  str = CONCAT("",counter);
	END IF;
	loop_label:  LOOP
		IF  counter <= 0 THEN 
			LEAVE  loop_label;
		END  IF;
		SET  counter = counter - 2;
		SET  str = CONCAT(str,',',counter);
	END LOOP;
	SELECT str as "Numeros pares";
END$$
DELIMITER ;

call LoopDemo(25);

/* Ejercicio 2: Enviar a un procedimiento dos números (base, exponente). Mostrar la potencia. */

drop procedure if exists potencias;
delimiter $$
create procedure potencias(in base int, in potencia int)
begin
	declare resultado int;
    set resultado = 1;
    multiplicaciones : LOOP
		set potencia = potencia -1;
		if potencia < 0 then
			leave multiplicaciones;
		end if;
		set resultado = resultado * base;
    END LOOP;
    select resultado as result;
end $$
delimiter ;

call potencias(2,6);

/* Ejercicio 3: Mediante un bucle, guardar en una tabla la tabla de multiplicar de 10 x 10. */

drop procedure if exists multiplication_table;
delimiter //
create procedure multiplication_table(in base int, in maximum int)
begin
    -- declare maximum int;
    declare counter int;
    set counter = 0;
    -- set maximum = 10;
	drop table if exists tabla_de_multiplicar;
    create table tabla_de_multiplicar (
		counter int primary key auto_increment,
        numero int,
        resultado int
    );
    
    fill_table : loop
		if counter = maximum then
			leave fill_table;
		else
			set counter = counter + 1;
            insert into tabla_de_multiplicar values (counter, base, counter * base);
        end if;
    end loop;
    select * from tabla_de_multiplicar;
end //
delimiter ;

call multiplication_table(10,12);

/* Ejercicio 4: Enviar a un procedimiento un número. Calcular si es primo o no. */

drop procedure if exists numero_primo;
delimiter //
create procedure numero_primo(in numero int)
begin
	declare output varchar(50);
    declare counter int;
    set counter = 2;
    set output = "Sí";
    prime_number : loop
		if numero = counter then
			leave prime_number;
		else
			if (numero % counter = 0) then
				set output = "No";
				leave prime_number;
            end if;
			set counter = counter + 1;
		end if;
    end loop;
    select output as "Es numero primo";
end//
delimiter ;

call numero_primo(23);


drop procedure if exists do_repeat;
delimiter $$
create procedure do_repeat(in p1 int)
begin
	set @x = 0;
    repeat
		set @x = @x +1;
	until @x = p1 end repeat;
end $$
delimiter ;
call do_repeat(20);
select @x;
