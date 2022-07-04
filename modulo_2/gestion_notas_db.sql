drop SCHEMA if exists IFCD0210;
create schema IFCD0210;

use IFCD0210;

create table alumnos(
	dni char(9) primary key,
    nombre varchar(20),
    apellidos varchar (50)
);

create table modulos(
	id char(8) primary key,
    nombre varchar(60)
);

create table ufs(
	id char(6) primary key,
    nombre varchar(60),
    duracion int,
    modulo char(8),
    foreign key (modulo) references modulos(id)
);

create table notas(
	id int primary key auto_increment,
    nota float,
    alumno char(9),
    foreign key (alumno) references alumnos(dni),
    uf char(6),
    foreign key (uf) references ufs(id)
);

