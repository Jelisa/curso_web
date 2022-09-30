-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema empleados
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `empleados` ;

-- -----------------------------------------------------
-- Schema empleados
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `empleados` DEFAULT CHARACTER SET utf8 ;
USE `empleados` ;

-- -----------------------------------------------------
-- Table `empleados`.`departamento`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `empleados`.`departamento` ;

CREATE TABLE IF NOT EXISTS `empleados`.`departamento` (
  `codigo` INT(10) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `presupuesto` DOUBLE NULL,
  PRIMARY KEY (`codigo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `empleados`.`empleado`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `empleados`.`empleado` ;

CREATE TABLE IF NOT EXISTS `empleados`.`empleado` (
  `codigo` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nif` VARCHAR(9) NOT NULL,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido1` VARCHAR(100) NOT NULL,
  `apellido2` VARCHAR(100) NULL,
  `codigo_departamento` INT(10) NULL,
  PRIMARY KEY (`codigo`),
  CONSTRAINT `fk_table1_departamento1`
    FOREIGN KEY (`codigo_departamento`)
    REFERENCES `empleados`.`departamento` (`codigo`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `empleados`.`departamento`
-- -----------------------------------------------------
START TRANSACTION;
USE `empleados`;
INSERT INTO `empleados`.`departamento` (`codigo`, `nombre`, `presupuesto`) VALUES (DEFAULT, 'IT', 1000000);
INSERT INTO `empleados`.`departamento` (`codigo`, `nombre`, `presupuesto`) VALUES (DEFAULT, 'HR', 2000000);
INSERT INTO `empleados`.`departamento` (`codigo`, `nombre`, `presupuesto`) VALUES (DEFAULT, 'Sistemas', 20000000);
INSERT INTO `empleados`.`departamento` (`codigo`, `nombre`, `presupuesto`) VALUES (DEFAULT, 'I+D', 50000000);
INSERT INTO `empleados`.`departamento` (`codigo`, `nombre`, `presupuesto`) VALUES (DEFAULT, 'gestion', 1000000);

COMMIT;


-- -----------------------------------------------------
-- Data for table `empleados`.`empleado`
-- -----------------------------------------------------
START TRANSACTION;
USE `empleados`;
INSERT INTO `empleados`.`empleado` (`codigo`, `nif`, `nombre`, `apellido1`, `apellido2`, `codigo_departamento`) VALUES (DEFAULT, '47401792A', 'pedro', 'jimenez', 'rodriguez', 1);
INSERT INTO `empleados`.`empleado` (`codigo`, `nif`, `nombre`, `apellido1`, `apellido2`, `codigo_departamento`) VALUES (DEFAULT, '38382980M', 'joan', 'quinielas', null, 1);
INSERT INTO `empleados`.`empleado` (`codigo`, `nif`, `nombre`, `apellido1`, `apellido2`, `codigo_departamento`) VALUES (DEFAULT, '78563401J', 'pedro', 'rodriguez', 'nuñez', 2);
INSERT INTO `empleados`.`empleado` (`codigo`, `nif`, `nombre`, `apellido1`, `apellido2`, `codigo_departamento`) VALUES (DEFAULT, '91300174W', 'pepe', 'ruiz', 'santana', 2);
INSERT INTO `empleados`.`empleado` (`codigo`, `nif`, `nombre`, `apellido1`, `apellido2`, `codigo_departamento`) VALUES (DEFAULT, '33925548S', 'lisa', 'flingstone', null, null);
INSERT INTO `empleados`.`empleado` (`codigo`, `nif`, `nombre`, `apellido1`, `apellido2`, `codigo_departamento`) VALUES (DEFAULT, '40946524L', 'maria', 'de la O', 'juarez', 3);
INSERT INTO `empleados`.`empleado` (`codigo`, `nif`, `nombre`, `apellido1`, `apellido2`, `codigo_departamento`) VALUES (DEFAULT, '51265095M', 'beatriz', 'garcia', 'jimenez', 4);
INSERT INTO `empleados`.`empleado` (`codigo`, `nif`, `nombre`, `apellido1`, `apellido2`, `codigo_departamento`) VALUES (DEFAULT, '66703265P', 'aracne', 'souleater', 'plaything', null);
INSERT INTO `empleados`.`empleado` (`codigo`, `nif`, `nombre`, `apellido1`, `apellido2`, `codigo_departamento`) VALUES (DEFAULT, '11081177A', 'macha', 'heartgraves', 'diaz', 5);
INSERT INTO `empleados`.`empleado` (`codigo`, `nif`, `nombre`, `apellido1`, `apellido2`, `codigo_departamento`) VALUES (DEFAULT, '03444786D', 'dusk', 'seelly', 'court', 5);

COMMIT;

