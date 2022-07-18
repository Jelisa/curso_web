use taller;

-- Obtener el nombre de todas las piezas.
select nombre from piezas;

-- Obtener todos los datos de todos los proveedores.
select * from proveedor;

-- Obtener el precio medio al que se nos suministran las piezas.
select avg(precio) from compra as media;
select avg(precio) from compra as media group by codigo_pieza;

-- Obtener los nombres de los proveedores que suministran la pieza 10.
select id_proveedor from compra where codigo_pieza = 10;
select nombre from proveedor where identificador = (select id_proveedor from compra where codigo_pieza = 10);

-- Obtener los nombres de las piezas suministradas por el proveedor cuyo código es TGLR
select nombre from piezas where codigo in (
	select codigo_pieza from compra where id_proveedor = "TGLR");

/* Obtener los nombres de los proveedores que suministran las piezas más caras,
 indicando el precio al que la suministran.*/
  select id_proveedor, max(precio) from compra group by codigo_pieza;

/* Hacer constar en la base de datos que la empresa “Tus piezas al momento, S.L.” 
va a empezar a suministrarnos Tuerca TRC a 2,19 cada una. */
insert into compra values (15, 2.19,
(select codigo from piezas where nombre = "Tuerca TRC"),
(select identificador from proveedor where nombre = "Tus piezas al momento, S.L.")
);

-- Aumentar los precios en diez céntimos.
set sql_safe_updates = 0; -- Permite hacer updates no seguros
update compra set precio = precio + 0.1;
set sql_safe_updates = 1;

/* Hacer constar en la base de datos que la empresa  “Las piezas de la calle 34, S.L.” no va a 
suministrarnos ninguna pieza (aunque la empresa sí va a seguir constando en nuestra base de datos).*/
update compra set precio = null 
where id_proveedor = (select identificador from proveedor where nombre = "Las piezas de la calle 34, S.L.");

delete from compra where id_proveedor = (select identificador from proveedor where nombre = "Las piezas de la calle 34, S.L.");

/* Hacer constar en la base de datos que la empresa  “Recambios y piezas, S.L.” ya no va a 
suministrarnos Motor MLT. compra*/
update compra set precio = null where codigo_pieza = (select codigo from piezas where nombre = "Motor MLT") and
	id_proveedor = (select identificador from proveedor where nombre = "Recambios y piezas, S.L.");

delete from compra where codigo_pieza = (select codigo from piezas where nombre = "Motor MLT") and
	id_proveedor = (select identificador from proveedor where nombre = "Recambios y piezas, S.L.");
/* Obtener un listado con el nombre de los proveedores y la cantidad de 
piezas que nos suministra cada uno.*/
select count(compra.codigo_pieza) as "# piezas suministradas", proveedor.nombre from compra 
inner join proveedor on compra.id_proveedor = proveedor.identificador group by compra.id_proveedor;

/* Ver un listado con todos los datos de los proveedores, incluyendo los datos de las piezas
que suministran y a qué precio, ordenado por nombre de proveedor.*/
select proveedor.identificador, proveedor.nombre, compra.codigo_pieza, piezas.nombre, compra.precio
 from proveedor 
	inner join (compra, piezas) on proveedor.identificador = compra.id_proveedor 
	and compra.codigo_pieza = piezas.codigo order by proveedor.nombre;

/*Ver el nombre del proveedor, nombre de la pieza y precio de todas las piezas que han sido 
suministradas, ordenado por pieza en ascendente y por precio en descendente.*/
select proveedor.nombre, piezas.nombre, compra.precio
 from proveedor 
	inner join (compra, piezas) on proveedor.identificador = compra.id_proveedor 
	and compra.codigo_pieza = piezas.codigo order by piezas.nombre, compra.precio desc;
    
-- Mostrar el nombre de los proveedores que no suministran ninguna pieza.
select distinct proveedor.nombre from proveedor inner join compra on proveedor.identificador = compra.id_proveedor
	where isnull(compra.precio);