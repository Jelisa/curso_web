use jelisa_biblioteca;

insert into usuarios values 
	(default, "pepito", "grillo", "conscience@disneyclassics.com", 300, 100, 2, default, default),
	(default, "DEATH", "THE", "kittenlover@discworld.com", 3000, 400, default, default, default),
    (default, "pedro", "picapiedra", "heavyworker@flingstones.com", 5, 0, 0, default, default),
    (default, "Juan", "Ramirez", "jr@gmail.com", 10, 0, default, default, default),
    (default, "Bill", "Gates", "bill.gates@gmail.com", 12, 5, default, default, default);

insert into usuarios(nombre_usuario, apellido_usuario, email_usuario) values
	("pedro", "marmol", "pm@flingstones.com"),
    ("sira", "gn", "newlyblond@bestfriends.ever");

insert into ciudades values
	(default, "Barcelona"),
    (default, "Londres"),
    (default, "Madrid");

insert into editoriales values
	(default, "debolsillo", 1),
    (default, "ecc", 1),
    (default, "planeta", 1),
    (default, "Transworld ", 2),
    (default, "Anchor Books", 2),
    (default, "orbit", 2);

insert into autores values
	(default, "Terry", "Prattchet"),
    (default, "Joan", "Rowling", "J.K.Rowlinkg"),
    (default, "John Ronald Reuel", "Tolkien", "J.R.R. Tolkien"),
    (default, "Philip Kindred ", "Dick", "Philip K. Dick"),
    (default, "Erin", "Morgenstern"),
    (default, "Gail", "Carriger");

insert into libros values
	(default, 1, 4, "Eric", 2010, "Eric es el aspirante a demonólogo del Mundodisco. Lástima que no se le dé muy bien. Todo lo que pide es que se le concedan...Eric es el aspirante a demonólogo del Mundodisco. Lástima que no se le dé muy bien. Todo lo que pide es que se le concedan tres deseos: el dominio sobre todos los reinos del mundo, la mujer más bella que haya existido jamás y vivir por toda la eternidad. Vamos, lo de siempre. Solo tendría que chasquear los dedos... Si hubiera invocado al ser adecuado. Los seguidores de Terry Pratchett llevaban años esperando este libro. Llega Eric , una divertida parodia de clásicos como Fausto , la Ilíada y La divina comedia . Una irónica visión de lo que puede ocurrir cuando se intenta gestionar el Infierno (una empresa como otra cualquiera, ¿o no?) de una manera eficiente."),
    (default, 2, 3, "Harry potter y la piedra filosofal", '2001', "" ),
    (default, 3, 3,  "El señor de los anillos", "2020", "El clásico de J.R.R. Tolkien en una nueva edición de coleccionista"),
    (default, 4, 3, "¿sueñan los androides?", "2012", ""),
    (default, 5, 5,  "The night Circus", "2017", "An amazin and interesting book about love, magic and rivalry"),
    (default, 6, 6, "Soulles", '2009', 'Soulless is a steampunk paranormal romance novel by Gail Carriger. First published in the United States on October 1, 2009 by Orbit Books, Soulless is the first book in the five-novel "The Parasol Protectorate" series, each featuring Alexia Tarabotti, a woman without a soul, as its lead character');

insert into prestamos(id_usuario, id_libro, fecha_devolucion) values 
	();