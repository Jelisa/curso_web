use cine;

-- Ejercicio 1:
select nombre, apellido, profesion, genero, oscars, fecha_nacimiento from people;

-- Ejercicio 2:
select nombre, apellido, oscars from people 
	where 
		genero = (select id_genero from genero where genero = "mujer");

-- Ejercicio 3:
select nombre, apellido, fecha_nacimiento from people 
	where nombre like "J%";

-- Ejercicio 4:
select nombre, apellido, profesion, genero, oscars, fecha_nacimiento from people
	where oscars = 1;

-- Ejercicio 5:
select nombre, apellido, profesion, genero, oscars, fecha_nacimiento from people
	where profesion = ( select id_profesion from profesion where profesion = "director");

-- Ejercicio 6:
select * from people
	where fecha_nacimiento > 1910
    order by apellido asc;

-- Ejercicio 7:
select max(id_people) into @last_people_register from people; /* guardo en una variable el último id registrado ya 
	que la primary key no se autoincrementa*/

insert into people values 
	(@last_people_register+1, "Woody", "Allen", 1, 2, 4, 1935), -- uso  el valor del ultimo registro +1 como id_people
    (@last_people_register+2, "Groucho", "Marx", 2, 2, 1, 1890); -- uso  el valor del ultimo registro +2 como id_people

-- Ejercicio 8:
-- al usar el id_people para hacer los update se evita que se queje de que es una actualización no segura.
update people 
	set fecha_nacimiento = 1932 
	where id_people = (select id_people from people where nombre = "John" and apellido = "Williams");

-- Extra arreglar el género de john ford
update people 
	set genero = (select id_genero from genero where genero = "hombre" )
	where id_people = (select id_people from people where nombre = "John" and apellido = "Ford");

-- Ejercicio 9:
delete from people 
	where id_people = (select id_people from people where nombre = "arthur" and apellido = "Rubinstein");

-- Ejercicio 10:
create or replace view actores_info_resumida as select nombre, apellido, oscars from people
	where profesion = ( select id_profesion from profesion where profesion = "actor");
