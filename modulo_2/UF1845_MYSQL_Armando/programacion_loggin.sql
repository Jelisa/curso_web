drop database if exists test;
create database test;
use test;

create table users(
	email varchar(100) primary key,
    pass varchar(100)
);

insert into users values ("pepito@gmail.com", "grillo");
 
 drop table if exists log_session;
create table log_session (
	id int primary key  auto_increment,
	email  varchar(100),
    fecha datetime
);

drop procedure if exists log_session;
delimiter //
create procedure log_session(in user_email varchar(100), in user_pass varchar(100))
begin
	set @db_email = (select email from users where email = user_email);
	set @db_pass = (select pass from users where pass = user_pass);
    if user_email = @db_email and user_pass = @db_pass then
		insert into log_session values (default, user_email, now());
		select "Login Correcto";
	else 
		select "Login Incorrecto";
	end if;
end //
delimiter ;

call log_session("pepito@gmail.com", "grillo");

select * from log_session;