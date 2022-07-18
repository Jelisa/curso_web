-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema tienda
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `tienda` ;

-- -----------------------------------------------------
-- Schema tienda
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tienda` DEFAULT CHARACTER SET utf8 ;
USE `tienda` ;

-- -----------------------------------------------------
-- Table `tienda`.`fabricantes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tienda`.`fabricantes` ;

CREATE TABLE IF NOT EXISTS `tienda`.`fabricantes` (
  `codigo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  PRIMARY KEY (`codigo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `tienda`.`articulos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `tienda`.`articulos` ;

CREATE TABLE IF NOT EXISTS `tienda`.`articulos` (
  `codigo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NULL,
  `precio` INT NULL,
  `fabricante` INT NOT NULL,
  PRIMARY KEY (`codigo`),
  CONSTRAINT `fk_articulos_fabricantes`
    FOREIGN KEY (`fabricante`)
    REFERENCES `tienda`.`fabricantes` (`codigo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `tienda`.`fabricantes`
-- -----------------------------------------------------
START TRANSACTION;
USE `tienda`;
INSERT INTO `tienda`.`fabricantes` (`codigo`, `nombre`) VALUES (DEFAULT, 'hp');
INSERT INTO `tienda`.`fabricantes` (`codigo`, `nombre`) VALUES (DEFAULT, 'logitech');
INSERT INTO `tienda`.`fabricantes` (`codigo`, `nombre`) VALUES (DEFAULT, 'msi');

COMMIT;


-- -----------------------------------------------------
-- Data for table `tienda`.`articulos`
-- -----------------------------------------------------
START TRANSACTION;
USE `tienda`;
INSERT INTO `tienda`.`articulos` (`codigo`, `nombre`, `precio`, `fabricante`) VALUES (DEFAULT, 'chromebook', 300, 1);
INSERT INTO `tienda`.`articulos` (`codigo`, `nombre`, `precio`, `fabricante`) VALUES (DEFAULT, 'raton', 30, 2);
INSERT INTO `tienda`.`articulos` (`codigo`, `nombre`, `precio`, `fabricante`) VALUES (DEFAULT, 'torre', 700, 3);
INSERT INTO `tienda`.`articulos` (`codigo`, `nombre`, `precio`, `fabricante`) VALUES (DEFAULT, 'teclado', 30, 2);
INSERT INTO `tienda`.`articulos` (`codigo`, `nombre`, `precio`, `fabricante`) VALUES (DEFAULT, 'monitor 22\"', 300, 3);
INSERT INTO `tienda`.`articulos` (`codigo`, `nombre`, `precio`, `fabricante`) VALUES (DEFAULT, 'portatil', 600, 1);
INSERT INTO `tienda`.`articulos` (`codigo`, `nombre`, `precio`, `fabricante`) VALUES (DEFAULT, 'torre', 500, 1);
INSERT INTO `tienda`.`articulos` (`codigo`, `nombre`, `precio`, `fabricante`) VALUES (DEFAULT, 'portatil', 800, 3);

COMMIT;

