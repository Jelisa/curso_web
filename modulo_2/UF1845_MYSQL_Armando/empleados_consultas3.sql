use empleados;

select * from departamento;

-- EJERCICIOS RESUMEN DE CONSULTAS --

/* 1. 	Calcula la suma del presupuesto de todos los departamentos.*/
select sum(presupuesto) from departamento;

/* 2. 	Calcula la media del presupuesto de todos los departamentos.*/
select avg(presupuesto) from departamento;

/* 3. 	Calcula el valor mínimo del presupuesto de todos los departamentos.*/
select min(presupuesto) from departamento;

/* 4. 	Calcula el nombre del departamento y el presupuesto que tiene asignado, del departamento con menor presupuesto.*/
select nombre, presupuesto from departamento where presupuesto = (select min(presupuesto) from departamento);
select nombre, presupuesto from departamento order by presupuesto asc limit 1; -- solución ñapa no robusta

/* 5. 	Calcula el valor máximo del presupuesto de todos los departamentos.*/
select max(presupuesto) from departamento;

/* 6. 	Calcula el nombre del departamento y el presupuesto que tiene asignado, del departamento con mayor presupuesto.*/
select nombre, presupuesto from departamento where presupuesto = (select max(presupuesto) from departamento);
select nombre, presupuesto from departamento order by presupuesto desc limit 1; -- solución ñapa no robusta.

/* 7. 	Calcula el número total de empleados que hay en la tabla empleado.*/
select count(*) from empleado;

select * from empleado;
/* 8. 	Calcula el número de empleados que no tienen NULL en su segundo apellido.*/
select count(apellido2) from empleado;

/* 9. 	Calcula el número de empleados que hay en cada departamento. Tienes que devolver dos columnas, 
		una con el nombre del departamento y otra con el número de empleados que tiene asignados.*/
select d.nombre, count(e.nombre) as num_empleados from empleado e join departamento d on e.codigo_departamento = d.codigo 
group by e.codigo_departamento;

/* 10.  Calcula el nombre de los departamentos que tienen más de 2 empleados. El resultado debe tener dos columnas, 
		una con el nombre del departamento y otra con el número de empleados que tiene asignados.*/
select d.nombre, count(e.nombre) as num_empleados from empleado e join departamento d on e.codigo_departamento = d.codigo 
group by e.codigo_departamento having count(e.nombre) >1;

/* 11.  Calcula el número de empleados que trabajan en cada uno de los departamentos. El resultado de esta consulta 
		también tiene que incluir aquellos departamentos que no tienen ningún empleado asociado.*/
select d.nombre, count(e.nombre) as num_empleados from empleado e right join departamento d on e.codigo_departamento = d.codigo 
group by e.codigo_departamento;
	
/* 12.  Calcula el número de empleados que trabajan en cada unos de los departamentos que tienen un presupuesto 
		mayor a 200000 euros.*/
select d.nombre, count(e.nombre) as num_empleados, d.presupuesto from empleado e left join departamento d on e.codigo_departamento = d.codigo 
group by e.codigo_departamento having d.presupuesto >200000;

-- EJERCICIOS SUBCONSULTAS --

/* 1. 	Devuelve un listado con todos los empleados que tiene el departamento de Sistemas. (Sin utilizar INNER JOIN).*/
select * from empleado where codigo_departamento = (select codigo from departamento where nombre="Sistemas");

/* 2. 	Devuelve el nombre del departamento con mayor presupuesto y la cantidad que tiene asignada.*/
select nombre, presupuesto from departamento where presupuesto = (select max(presupuesto) from departamento);

/* 3. 	Devuelve el nombre del departamento con menor presupuesto y la cantidad que tiene asignada.*/
select nombre, presupuesto from departamento where presupuesto = (select min(presupuesto) from departamento);

 /* Subconsultas con ALL y ANY*/ 
/* 4. 	Devuelve el nombre del departamento con mayor presupuesto y la cantidad que tiene asignada. 
		Sin hacer uso de MAX, ORDER BY ni LIMIT.*/
select nombre, presupuesto from departamento where  presupuesto >= All (select presupuesto from departamento);
        
/* 5. 	Devuelve el nombre del departamento con menor presupuesto y la cantidad que tiene asignada. 
		Sin hacer uso de MIN, ORDER BY ni LIMIT.*/
select nombre, presupuesto from departamento where  presupuesto <= All (select presupuesto from departamento);

/* 6. 	Devuelve los nombres de los departamentos que tienen empleados asociados. (Utilizando ALL o ANY).*/
select nombre, codigo from departamento where codigo = any (select codigo_departamento from empleado);

/* 7. 	Devuelve los nombres de los departamentos que no tienen empleados asociados. (Utilizando ALL o ANY).*/
select nombre, codigo from departamento where codigo != all (
	select codigo_departamento from empleado where codigo_departamento is not null);
 
/* Subconsultas con IN y NOT IN*/
 
/* 8. 	Devuelve los nombres de los departamentos que tienen empleados asociados. (Utilizando IN o NOT IN).*/
select nombre, codigo from departamento where codigo in (select codigo_departamento from empleado);

/* 9. 	Devuelve los nombres de los departamentos que no tienen empleados asociados. (Utilizando IN o NOT IN).*/
select nombre, codigo from departamento where codigo not in (
	select distinct codigo_departamento from empleado where codigo_departamento is not null);


/* Subconsultas con EXISTS y NOT EXISTS*/
 
/* 10.  	Devuelve los nombres de los departamentos que tienen empleados asociados. (Utilizando EXISTS o NOT EXISTS).*/
select nombre, codigo from departamento d where exists (select codigo_departamento from empleado where codigo_departamento = d.codigo);

/* 11.  	Devuelve los nombres de los departamentos que no tienen empleados asociados. (Utilizando EXISTS o NOT EXISTS).*/
select nombre, codigo from departamento d where not exists (select codigo_departamento from empleado where codigo_departamento = d.codigo)
