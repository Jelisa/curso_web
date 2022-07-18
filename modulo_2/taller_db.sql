-- comentario de una linea
/*
multilinea
*/
-- create schema ES LO MISMO QUE create database
drop schema if exists taller;
create schema taller;
-- seleccionar la base d edatos donde añadiremos las tablas
use taller;

-- creamos la tabla piezas
create table piezas(
	codigo int primary key,
    nombre varchar(15)
);

-- creamos la tabla proveedor
create table proveedor(
	identificador char(4) primary key,
    nombre varchar(40)
);

-- creamos la relacion entre las tablas
create table compra(
	id_compra int primary key auto_increment,
    precio decimal(5,2),
    codigo_pieza int, -- FK1
    foreign key (codigo_pieza) references piezas(codigo),
    id_proveedor char(4),
	foreign key (id_proveedor) references proveedor(identificador)
);

show tables;









