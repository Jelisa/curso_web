/* Run in the localhost
	drop schema if exists jelisa_biblioteca;
	create schema jelisa_biblioteca;
	use jelisa_biblioteca; */

/* Run in infinityFree*/
use epiz_32640116_jelisa_biblioteca;

drop table if exists usuarios;
create table usuarios (
	id_usuario int (5) auto_increment primary key,
    nombre_usuario varchar (40) not null,
    apellido_usuario varchar (40) not null,
    email_usuario varchar (40) not null,
    num_consultas_usuario int(5) default 0,
    num_prestamos_usuario int(5) default 0,
    num_dias_retrasos int(5) default 0,
    bloqueado_usuario boolean default 0,
    fecha_alta_usuario date default (current_date())
);

drop table if exists ciudades;
create table ciudades(
	id_ciudad int(5) auto_increment primary key,
    nombre_ciudad varchar(40) not null
);

drop table if exists editoriales;
create table editoriales(
	id_editorial int(5) auto_increment primary key,
    nombre_editorial varchar(40) not null,
    id_ciudad int(5) not null,
    foreign key (id_ciudad) references ciudades(id_ciudad) 
);

drop table if exists autores;
create table autores(
	id_autor int(5) auto_increment primary key,
    nombre_autor varchar (40) not null,
    apellido_autor varchar(60) not null,
    pseudonimo_autor varchar(100)
);

drop table if exists libros;
create table libros(
	id_libro int(5) auto_increment primary key,
    id_autor int(5) not null,
    id_editorial int (5) not null,
    titulo_libro varchar(100) not null,
    any_edicion_libro year not null,
    descripcion_libro text(100000),
    fulltext idx (descripcion_libro),
    foreign key (id_autor) references autores(id_autor),
    foreign key (id_editorial) references editoriales(id_editorial)
);

drop table if exists prestamos;
create table prestamos(
	id_prestamo int(5) auto_increment primary key,
    id_usuario int(5) not null,
    id_libro int(5) not null,
    fecha_prestamo date default (current_date()),
    fecha_devolucion date  not null,
    foreign key (id_usuario) references usuarios(id_usuario),
    foreign key (id_libro) references libros(id_libro)
);