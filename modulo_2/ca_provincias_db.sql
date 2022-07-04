drop schema if exists comunidades;
create schema comunidades;

use comunidades;

create table comunidades_autonomas(
	id char(3) primary key,
    nombre varChar(25)
);

create table provincias(
	provincia varChar(30) primary key,
    ca char(3),
    foreign key (ca) references comunidades_autonomas(id)
);
