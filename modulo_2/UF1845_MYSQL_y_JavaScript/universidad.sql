


-- update the ciudad column with the ciudad id

UPDATE profesor 
	join persona on profesor.id_profesor=persona.id
    join ciudad on ciudad.nombre_ciudad=persona.ciudad
    SET	profesor.id_ciudad=ciudad.id_ciudad

-- creacion nueva tabla asignaturas:
create tipos_asignatura(
    id_tipo_asignatura int(5) unsigned primary key auto_increment,
    nombre_tipo_asignatura varchar(20)
)

-- Add the diferent types already existing on the persona table
INSERT INTO `tipos_asignatura`(`nombre_tipo_asignatura`)
SELECT DISTINCT tipo from asignaturas


-- Modify the table asignaturas 
ALTER table asignaturas MODIFY tipo int(5) unsigned;
-- Modifica la columna directamente a valores numéricos, como lo hace por orden de aparición 
alter TABLE asignaturas add FOREIGN key (tipo) REFERENCES tipos_asignatura(id_tipo_asignatura);


-- Añadir los profesores que no tenían id
INSERT INTO `profesor`(`id_profesor`, `nif_profesor`, `nombre_profesor`, `apellido1_profesor`, `apellido2_profesor`, `direccion_profesor`, `telefono_profesor`, `fecha_nacimiento_profesor`, `sexo_profesor`, `id_ciudad`, id_departamento)
 SELECT 
   	id, nif, nombre, apellido1, apellido2, direccion, telefono, fecha_nacimiento, sexo, 1, (SELECT abs(floor(RAND(-10)*(9-1+1)+1))) as a
    FROM `persona` 
    WHERE
        tipo = "profesor"
        and
        id not in (SELECT id_profesor from profesor)
/* el select me añade un valor de departamento de forma random ya que no puede ser null
    el 1 como id_ciudad lo he puesto porque solo hay una ciudad en la database, sino se podría añadir de forma aleatoria al igual que se ha hecho con el id_departamento.
*/

-- eliminar los profesores de la lista persona que ya están introducidos en profesores
DELETE FROM `persona` WHERE
        tipo = "profesor"
        and
        id in (SELECT id_profesor from profesor)

-- Requiere eliminar el foreign key de profesor, profesor_ibfk_1 es el nombre del constraint a eliminar.
alter table profesor drop CONSTRAINT  profesor_ibfk_1

-- procedimiento para saber qué alumnos se han matriculado un año que se da como parámetro
DELIMITER $$
create PROCEDURE alumnosMatriculadosAny (in any year)
BEGIN
	SELECT DISTINCT nombre, apellido1 FROM persona, curso_escolar as c, alumno_se_matricula_asignatura as mat where persona.id = mat.id_alumno AND mat.id_curso_escolar =c.id and c.anyo_inicio = 2018;
END $$
DELIMITER ;

-- Creaer funcion que calcule la edad del estudiante:
DELIMITER $$
create function calcularEdad(idToEvaluate int(5)) RETURNS year
begin 
    DECLARE fecha_nacimiento date;
    select fecha_nacimiento from alumnos where id = idToEvaluate into fecha_nacimiento;
    return floor(datediff(CURRENT_DATE, fecha_nacimiento)/365.25);
end $$
delimiter ;


/* Creación de procedimientos*/

delimiter //
create procedure cuentaPalabra(in palabra varchar(40), out num_times int)
begin
    num_times = SELECT count(*) from persona where nombre = palabra group by nombre;
end//
delimiter ;

/*Creación de funciones*/

delimiter //
create function funcionPalabras (palabra varchar(40)) returns int
begin
    declare resultado int;
    SELECT count(nombre) from persona where nombre = palabra into resultado;
    return resultado;
end //
delimiter ;