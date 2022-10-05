select * from mysql.user;
create user "cliente";
alter user cliente IDENTIFIED  by "1234"; -- modifico cliente para añadir la contraseña
GRANT usage on universidad.* to cliente;
grant select on universidad.* to cliente;
grant insert on universidad.* to cliente;
grant all privileges on universidad.* to cliente;
revoke all privileges on universidad.* from cliente;

grant select, insert, update, delete on universidad.* to cliente;
show grants for cliente;
flush privileges; -- aplica los cambios a los privilegios del usuario aunque esté conectado
drop user cliente;

create user cliente identified by '1234';
grant usage on universidad.* to cliente@192.44.89.34;
