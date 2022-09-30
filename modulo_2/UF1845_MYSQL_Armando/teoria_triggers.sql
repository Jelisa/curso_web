drop database if exists test;
create database test;
use test;

drop table if exists usuarios;
create table usuarios(
	id int primary key auto_increment,
    nombre varchar(45),
    edad int not null
);

drop trigger if exists valida_edad;
delimiter $$
create trigger valida_edad before insert on usuarios for each row
begin
	if new.edad < 18 then
		set new.edad = null;
    end if;
end $$
delimiter ;

insert into usuarios values (default, "pedro picapiedra", 30);
insert into usuarios values (default, "bambam marmol", 3);

-- Log de los cambios de código de acceso
drop table if exists cod_access;
create table cod_access(
	id int primary key auto_increment,
    nombre varchar(50),
    codigo int
);

drop table if exists cod_access_log;
create table cod_access_log(
	id int primary key auto_increment,
    usuario varchar(255),
    fecha datetime default current_timestamp,
    nombre varchar(45),
    codigo_old int,
    codigo_new int
);
insert into cod_access values(default, "codigo 1", 1111);
insert into cod_access values(default, "codigo 2", 2222);
insert into cod_access values(default, "codigo 3", 3333);


drop trigger if exists code_user_log;
delimiter $$
create trigger code_user_log before update on cod_access for each row
begin
	insert into cod_access_log values(
		default,
        current_user(),
        default,
        old.nombre,
        old.codigo,
        new.codigo
    );
end $$
delimiter ;

update cod_access set codigo = 1112 where id = 1;
select * from cod_access;
select * from cod_access_log;
