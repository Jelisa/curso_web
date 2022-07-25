use empleados;

-- INNER JOIN

/* 1. 	Devuelve un listado con los empleados y los datos de los departamentos donde trabaja cada uno.*/
select * from empleado e, departamento d where e.codigo_departamento = d.codigo;
select * from empleado e join departamento d on e.codigo_departamento = d.codigo;

/* 2. 	Devuelve un listado con los empleados y los datos de los departamentos donde trabaja cada uno. 
		Ordena el resultado, en primer lugar por el nombre del departamento (en orden alfabético) y en 
        segundo lugar por los apellidos y el nombre de los empleados.*/
select * from empleado e, departamento d where e.codigo_departamento = d.codigo 
	order by d.nombre, e.apellido1, e.apellido2, e.nombre;

/* 3. 	Devuelve un listado con el código y el nombre del departamento, solamente de aquellos departamentos 
		que tienen empleados.*/
select distinct d.codigo, d.nombre from empleado e, departamento d where e.codigo_departamento = d.codigo;

/* 4. 	Devuelve un listado con el código, el nombre del departamento y el valor del presupuesto actual del 
		que dispone, solamente de aquellos departamentos que tienen empleados. El valor del presupuesto actual 
        lo puede calcular restando al valor del presupuesto inicial (columna presupuesto) el valor de los gastos 
        que ha generado (columna gastos).*/
select d.codigo, d.nombre, d.presupuesto-d.gastos as presupuesto_actual from empleado e, departamento d 
	where e.codigo_departamento = d.codigo;

/* 5. 	Devuelve el nombre del departamento donde trabaja el empleado que tiene el nif 38382980M.*/
select d.nombre from empleado e, departamento d where e.codigo_departamento = d.codigo and e.nif = "38382980M";

/* 6. 	Devuelve el nombre del departamento donde trabaja el empleado Pepe Ruiz Santana.*/
select d.nombre from empleado e, departamento d where e.codigo_departamento = d.codigo and 
	e.nombre = "pepe" and e.apellido1 = "ruiz" and e.apellido2 = "santana";

/* 7. 	Devuelve un listado con los datos de los empleados que trabajan en el departamento de I+D. 
		Ordena el resultado alfabéticamente.*/
select e.* from empleado e, departamento d where e.codigo_departamento = d.codigo and d.nombre = "I+D";

/* 8. 	Devuelve un listado con los datos de los empleados que trabajan en el departamento de Sistemas, 
		Contabilidad o I+D. Ordena el resultado alfabéticamente.*/
select e.* from empleado e, departamento d where e.codigo_departamento = d.codigo and 
	d.nombre in ("sistemas", "I+D", "Contabilidad") order by e.nombre;

/* 9. 	Devuelve una lista con el nombre de los empleados que tienen los departamentos que no tienen un 
		presupuesto entre 100000 y 200000 euros.*/
select e.nombre from empleado e, departamento d where e.codigo_departamento = d.codigo and 
	d.presupuesto not between 100000 and 2000000 ;

/* 10. Devuelve un listado con el nombre de los departamentos donde existe algún empleado cuyo segundo 
		apellido sea NULL. Tenga en cuenta que no debe mostrar nombres de departamentos que estén repetidos.*/
select d.nombre from empleado e, departamento d where e.codigo_departamento = d.codigo and 
	e.apellido2 is null;


-- RIGHT/LEFT JOIN


-- Resuelva todas las consultas utilizando las cláusulas LEFT JOIN y RIGHT JOIN.*/

/* 1. 	Devuelve un listado con todos los empleados junto con los datos de los departamentos donde trabajan. 
		Este listado también debe incluir los empleados que no tienen ningún departamento asociado.*/
select * from empleado e left join departamento d on e.codigo_departamento = d.codigo;

/* 2. 	Devuelve un listado donde sólo aparezcan aquellos empleados que no tienen ningún departamento asociado.*/
select * from empleado e left join departamento d on e.codigo_departamento = d.codigo 
	where e.codigo_departamento is null;

/* 3. 	Devuelve un listado donde sólo aparezcan aquellos departamentos que no tienen ningún empleado asociado.*/
-- insert into departamento values (default, "Contabilidad", 4000);
select * from departamento d left join empleado e on e.codigo_departamento = d.codigo where e.codigo is null;

/* 4. 	Devuelve un listado con todos los empleados junto con los datos de los departamentos donde trabajan. 
		El listado debe incluir los empleados que no tienen ningún departamento asociado y los departamentos 
        que no tienen ningún empleado asociado. Ordene el listado alfabéticamente por el nombre del departamento.*/

select * from (select e.*, d.nombre as nombre_departamento, d.presupuesto from empleado e 
				left join departamento d on e.codigo_departamento = d.codigo
				union
				select e.*, d.nombre as nombre_departamento, d.presupuesto  from empleado e 
				right join departamento d on e.codigo_departamento = d.codigo) a
    order by nombre_departamento;

/* 5. 	Devuelve un listado con los empleados que no tienen ningún departamento asociado y los departamentos que 
		no tienen ningún empleado asociado. Ordene el listado alfabéticamente por el nombre del departamento.*/
(select * from departamento d right join empleado e on e.codigo_departamento = d.codigo where d.codigo is null
	order by d.nombre)
	union
	(select * from departamento d left join empleado e on e.codigo_departamento = d.codigo where e.codigo is null
	order by d.nombre);

