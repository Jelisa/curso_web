USE tienda;

-- 1.1  Obtener los nombres de los productos de la tienda.
  select nombre from articulos;
  
-- 1.2  Obtener los nombres y los precios de los productos de la tienda.
  select nombre, precio from articulos;
 
-- 1.3  Obtener el nombre de los productos cuyo precio sea menor o igual a 200.
   select nombre from articulos where precio <= 200;

-- 1.4  Obtener todos los datos de los artículos cuyo precio esté entre
-- los 60 y los 120€ (ambas cantidades incluidas).
select nombre from articulos where precio>= 10 and precio <= 200;
select nombre from articulos where precio between 10 and 200;
    
-- 1.5  Obtener el nombre y el precio en pesetas (es decir, el precio en euros multiplicado por 166’386).
select nombre, precio * 166.386 as "precio en pesetas" from articulos;
    
-- 1.6  Seleccionar el precio medio de todos los productos.
select avg(precio) from articulos;

-- 1.7  Obtener el precio medio de los artículos cuyo código de fabricante sea 2.
select avg(precio) from articulos where fabricante = 2;

-- 1.8  Obtener el número de artículos cuyo precio sea mayor o igual a 180€.
select count(precio) from articulos where precio >= 180;
 
-- 1.9  Obtener el nombre y precio de los artículos cuyo precio sea mayor o igual a   180 €
--  y ordenarlos descendentemente por precio, y luego ascendentemente por nombre.
 select nombre, precio from articulos where precio >= 180 order by precio desc, nombre asc;
 
-- 1.10  Obtener un listado completo de artículos, incluyendo por cada artículo los datos del artículo
--  y de su fabricante.
-- sin JOIN:
select * from ARTICULOS, FABRICANTES where FABRICANTES.Codigo = ARTICULOS.Fabricante;
select * from articulos inner join fabricantes where FABRICANTES.Codigo = ARTICULOS.Fabricante;
 
-- 1.11  Obtener un listado de artículos, incluyendo el nombre del artículo, su precio, y el nombre de su fabricante.
 select articulos.nombre, articulos.precio, fabricantes.nombre from articulos, fabricantes 
	where articulos.fabricante = fabricantes.codigo;
 
-- 1.12  Obtener el precio medio de los productos de cada fabricante, mostrando solo los códigos de fabricante.
 select avg(precio), fabricante from articulos group by fabricante;
 
-- 1.13  Obtener el precio medio de los productos de cada fabricante, mostrando el nombre del fabricante.
 select avg(articulos.precio), fabricantes.nombre from articulos, fabricantes 
	where articulos.fabricante = fabricantes.codigo group by articulos.fabricante;
 
-- 1.14  Obtener los nombres de los fabricantes que ofrezcan productos cuyo precio medio sea mayor o igual a 150 €.
 select avg(articulos.precio), fabricantes.nombre from articulos, fabricantes 
	where articulos.fabricante = fabricantes.codigo group by articulos.fabricante having avg(articulos.precio) >= 150;

-- 1.15  Obtener el nombre y precio del artículo más barato.
select nombre, precio from articulos  order by precio limit 1;
 
-- 1.16  Obtener una lista con el nombre y precio de los artículos más caros de cada proveedor 
-- (incluyendo el nombre del proveedor).
select articulos.nombre, max(articulos.precio), fabricantes.nombre from articulos, fabricantes
group by fabricantes.nombre;

-- 1.17  Añadir un nuevo producto: Altavoces de 70 € (del fabricante 2).
select * from articulos;
insert into articulos values (default, " Altavoces", 70, 2);
select * from articulos;
 
-- 1.18  Cambiar el nombre del producto 8 a ’Impresora Láser’
update articulos set nombre = "Impresora Láser" where codigo = 8;

-- 1.19  Aplicar un descuento del 10% a todos los productos.
update articulos set precio = precio * 0.90 where codigo < 10;

-- 1.20  Aplicar un descuento de 10€ mayor o igual a 120€.
select * from articulos;
update articulos set precio = precio - 10 where precio >= 120 and codigo < 11;