use sakila;
/* 1) Actores que tienen el primer nombre "Gary" */
select concat_ws(" ", first_name, last_name) as nombre_completo from actor where first_name = "Gary";

/* 2) Actores que tiene de primer apellido "Streep" */
select concat_ws(" ", first_name, last_name) as nombre_completo from actor where last_name = "Streep";

/* 3) Actores que contengan una "o" en su nombre */
select concat_ws(" ", first_name, last_name) as nombre_completo from actor where first_name like "%o%";

/* 4) Actores que contengan una "a" en su nombre y una "e" en su apellido */
select concat_ws(" ", first_name, last_name) as nombre_completo from actor where first_name like "%a%" and last_name like "%e%";

/* 5) Actores que contengan dos "o" en su nombre y una "a" en su apellido */
select concat_ws(" ", first_name, last_name) as nombre_completo from actor where first_name like "%o%o%" and last_name like "%a%";

/* 6) Actores cuya tercera letra del nombre sea "b" */
select concat_ws(" ", first_name, last_name) as nombre_completo from actor where first_name like "__b%";

/* 7) Ciudades que empiezan por "a" */
select city from city where city like "a%";

/* 8) Ciudades que acban por "s" */
select city from city where city like "%s";

/* 9) Ciudades del country "Spain" */
select city.city from city, country where city.country_id = (select country_id from country where country = "Spain");

/* 10) Ciudades con nombres compuestos (como New York) */
select city from city where city like "% %";

/* 11) películas con una duración entre 80 y 100 m. */
select title, length from film where length between 80 and 100;

/* 12) películas con un rental_rate entre 1 y 3 */
select title, rental_rate from film where rental_rate between 1 and 3;

/* 13) películas con un título de más de 11 letras. */
select title from film where length(title) > 11;

/* 14) películas con un rating de PG o G. */
 select title, rating from film where rating in ("PG", "G");
 
/* 15) ¿Cuantas ciudades tiene el country ‘France’?  */
select count(*) as "cities from France" from city where country_id = (select country_id from country where country = "France");

/* 16) Películas que no tengan un rating de NC-17 */
select title, rating from film where rating != "NC-17";

/* 17) Películas con un rating PG y duración de más de 120. */
select title, rating, length from film where rating != "PG" and length > 120;

/* 18) ¿Cuantos actores hay? */
select count(distinct actor_id) as "numero de actores" from film_actor;

/* 19) Película con mayor duración. */
-- Returns all the movies with the maximum length
select title, length  from film where length = (select max(length) from film); 
-- Returns the first movie with the maximum length in alphabetical order
select title, length  from film where length = (select max(length) from film) limit 1; 

/* 20) ¿Cuantos countries hay que empiezan por ‘a’?  */
select count(country) from country where country like "a%";

/* 21) Visualiza los 10 actores que han participado en más películas */
select a.first_name, a.last_name, count(f.film_id) as numero_peliculas from actor as a, film_actor as f 
	where a.actor_id = f.actor_id 
	group by a.actor_id order by numero_peliculas desc limit 10;

/* 22) Visualiza los clientes de países que empiezan por S */

-- buscando la solución por la base de datos
select c.first_name, c.last_name from customer as c
	inner join	(store as s inner join 
			(address as a inner join 
				(city as ci inner join country as p on ci.country_id = p.country_id)
			on a.address_id = ci.country_id)
		on s.address_id = a.address_id)
	on c.store_id = s.store_id
 where p.country like "s%";
select p.country_id from country as p where p.country like "S%";

-- usando la vista
select name from customer_list where country like "S%";

-- los resultados de ambas búsquedas no cuadran

/* 23) Visualiza el top-10 de países con más clientes */
select count(*), p.country from customer as c
	inner join	(store as s inner join 
			(address as a inner join 
				(city as ci inner join country as p on ci.country_id = p.country_id)
			on a.address_id = ci.country_id)
		on s.address_id = a.address_id)
	on c.store_id = s.store_id
    group by p.country;

/* 24) Saca las 10 primeras películas alfabéticamente y el número de copias que se disponen de cada una de ellas */
select title, count(*) from inventory as i, film as f where i.film_id = f.film_id group by i.film_id order by f.title limit 10;

/* 25) Saca todas las películas que ha alquilado el cliente Deborah Walker */
select distinct f.description from customer as c, rental as r, inventory as i, film as f
	where c.customer_id = r.customer_id and r.inventory_id = i.inventory_id and i.film_id = f.film_id and
    c.first_name = "deborah" and c.last_name = "walker";
