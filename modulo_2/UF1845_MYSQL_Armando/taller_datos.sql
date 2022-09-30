-- seleccionar la base de datos donde añadiremos la informacion.
use taller;

-- añadir datos de piezas
insert into piezas values 
	(10, "Tornillo TL"),
    (11, "Motor MLT"),
    (12, "Rueda IZQ"),
    (13, "Tuerca TRC"),
    (14, "Rueda DRC");

-- insertar los datos de proveedores
insert into proveedor values
	("A2TH", "Tus piezas al momento, S.L."),
    ("SHG4", "Recambios y piezas, S.L."),
	("KFI3", "Gran proveedor de piezas, S.A."),
    ("DG34", "Las piezas de la calle 34, S.L."),
	("TGLR", "Super piezas, SCP.");

-- datos de compra

/* version sin autoincremento
insert into compra values
	(1,  1.25, 10, "A2TH"),
	(2, 124.50, 11,  "KFI3"),
    (3, 46.78, 12, "SHG4"),
    (4, 2.34, 13, "TGLR"),
    (5, 44.34, 14, "KFI3"),
    (6, 1.09, 10, "SHG4"),
    (7, 129.69, 11, "SHG4"),
    (8, 2.28, 13, "DG34"),
    (9, 1.19, 10, "DG34"),
    (10, 46.80, 12, "KFI3"),
    (11, 45.59, 14, "TGLR"),
    (12, 127.34, 11, "TGLR"),
    (13, 131.50, 11, "A2TH"),
    (14, 49.90, 11, "TGLR");
*/
insert into compra values
	(default,  1.25, 10, "A2TH"),
	(default, 124.50, 11,  "KFI3"),
    (default, 46.78, 12, "SHG4"),
    (default, 2.34, 13, "TGLR"),
    (default, 44.34, 14, "KFI3"),
    (default, 1.09, 10, "SHG4"),
    (default, 129.69, 11, "SHG4"),
    (default, 2.28, 13, "DG34"),
    (default, 1.19, 10, "DG34"),
    (default, 46.80, 12, "KFI3"),
    (default, 45.59, 14, "TGLR"),
    (default, 127.34, 11, "TGLR"),
    (default, 131.50, 11, "A2TH"),
    (default, 49.90, 11, "TGLR");