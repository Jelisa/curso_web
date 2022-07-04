use taller;

-- Obtener el nombre de todas las piezas.
select nombre from piezas;

-- Obtener todos los datos de todos los proveedores.
select * from proveedor;

-- Obtener el precio medio al que se nos suministran las piezas.
select avg(precio) from compra;

-- Obtener los nombres de los proveedores que suministran la pieza 10.
select id_proveedor from compra where codigo_pieza = 10;

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
update compra set precio = precio + 0.1 where id_compra;

/* Hacer constar en la base de datos que la empresa  “Las piezas de la calle 34, S.L.” no va a 
suministrarnos ninguna pieza (aunque la empresa sí va a seguir constando en nuestra base de datos).*/
update compra set precio = null where id_proveedor =(select identificador from proveedor where nombre = "Las piezas de la calle 34, S.L.");

/* Hacer constar en la base de datos que la empresa  “Recambios y piezas, S.L.” ya no va a 
suministrarnos Motor MLT. */
update compra set precio = null where codigo_pieza = (select codigo from piezas where nombre = "Motor MLT") and
id_proveedor = (select identificador from proveedor where nombre = "Recambios y piezas, S.L.");