<!DOCTYPE html>
<html lang="es" >

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Carrito de la compra</title>
  
    <link rel="stylesheet" href="css/estils.css">
</head>

<body>
    <div class="container">

        <h1 id="main-title" tabindex="0">Carrito de la compra</h1>
        <img tabindex="0" src="img/compra.jpg" id="main-image" alt="fotografia de frutas en un supermercado"/>

        <div id="presentacio">
            <h2 tabindex="0">Compra la <em class="underline">mejor fruta</em> en nuestro supermercado <em>online!</em></h2>

            <p id="instrucciones" tabindex="0">Escoge la fruta que quieres haciendo clic sobre su imagen</p>
        </div>

        <ul class="fruites">
            <li class="col fruits_button" tabindex="0" onclick="addProduct('pomelo')">
                <figure>
                    <img class="imatges" src="img/aranja.png" alt="">                
                    <figcaption id="pomelo">Pomelo : 2,50€/kg</figcaption>
                </figure>
            </li>
            <li class="col fruits_button" tabindex="0" onclick="addProduct('kiwi')">
                <figure>
                    <img class="imatges" src="img/kiwi.png" alt="">
                    <figcaption id="kiwi">Kiwi : 4,20€/kg</figcaption>
                </figure>
            </li>
            <li class="col fruits_button" tabindex="0" onclick="addProduct('limon')">
                <figure>
                    <img class="imatges" src="img/llimones.png" alt="">
                    <figcaption id="limon">Limón : 1,20€/kg</figcaption>
                </figure>
            </li>
            <li class="col fruits_button" tabindex="0" onclick="addProduct('pinya')">
                <figure>
                    <img class="imatges" src="img/pinya.png" alt="">
                    <figcaption id="pinya">Piña : 2,8€/ud</figcaption>
                </figure>
            </li>
            <li class="col fruits_button" tabindex="0" onclick="addProduct('sandia')">
                <figure>
                    <img class="imatges" src="img/sindria.png" alt="">
                    <figcaption id="sandia">Sandía: 1,20€/kg</figcaption>
                </figure>
            </li>
            <li class="col fruits_button" tabindex="0" onclick="addProduct('manzanaRoja')">
                <figure>
                    <img class="imatges" src="img/poma_vermella.png" alt="">                
                    <figcaption id="manzanaRoja">Manzana roja: 1,80€/kg</figcaption>
                </figure>
            </li>
            <li class="col fruits_button" tabindex="0" onclick="addProduct('cerezas')">
                <figure>
                    <img class="imatges" src="img/cireres.png" alt="">
                    <figcaption id="cerezas">Cerezas : 6,40€/kg</figcaption>
                </figure>
            </li>
            <li class="col fruits_button" tabindex="0" onclick="addProduct('melocoton')">
                <figure>
                    <img class="imatges" src="img/pressec.png" alt="">
                    <figcaption id="melocoton">Melocotón : 3,40€/kg</figcaption>
                </figure>
            </li>
            <li class="col fruits_button" tabindex="0" onclick="addProduct('manzanaVerde')">
                <figure>
                    <img class="imatges" src="img/poma_verda.png" alt="">
                    <figcaption id="manzanaVerde">Manzana verde: 2,20€/ud</figcaption>
                </figure>
            </li>
            <li class="col fruits_button" tabindex="0" onclick="addProduct('melon')">
                <figure>
                    <img class="imatges" src="img/melo.png" alt="">
                    <figcaption id="melon">Melón: 1,90€/kg</figcaption>
                </figure>
            </li>
        </ul>

        <div>
            <h2 tabindex="0">Carrito de la compra:</h2>
            <ul id="carrito"></ul>
            <h2 id="total"></h2>

        </div>

        <form action="datos.php" method="post" id="php_form">
            <fieldset>
                <legend tabindex="0">Datos de envío</legend>
                <p>
                    <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre"  aria-required="true">
                </p>
                <p>
                    <label for="apellido">Apellidos</label>
                    <input type="text" id="apellido" name="apellido"  aria-required="true">
                </p>
                <p>
                    <label for="direccion">Dirección</label>
                    <input type="text" id="direccion" name="direccion"  aria-required="true">
                </p>
                <p>
                    <label for="pais">País</label>
                    <input type="text" id="pais" name="pais"  aria-required="true">
                </p>
                <p>
                    <label for="provincia">Provincia</label>
                    <input type="text" id="provincia" name="provincia"  aria-required="true">
                </p>
                <p>
                    <label for="ciudad">Ciudad</label>
                    <input type="text" id="ciudad" name="ciudad"  aria-required="true">
                </p>
                <p>
                    <label for="cp">Código postal</label>
                    <input type="text" id="cp" name="cp"  aria-required="true" maxlength="5">
                </p>
                <p>
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" name="email"  aria-required="true">
                </p>
                <p>
                    <label for="phone">Teléfono de contacto</label>
                    <input type="tel" pattern="[96][0-9]{8}" maxlength="9" id="phone" name="phone" 
                     aria-required="true" placeholder="(9|6)XXXXXXXX" aria-label="El número de teléfono ha de empezar por 9 o por 6.">
                </p>
                <input type="submit" value="Enviar Datos">
            </fieldset>
        </form>

        <form action="">
            <fieldset role="form">
                <legend>Danos tu opinión</legend>
                <p>
                    <label for="nombre">Nombre</label>
                    <input type="text" name="nombre" id="nombre" required aria-required="true">
                </p>
                <p tabindex="0">Valora tu experiencia</p>
                <ul >
                    <li class="valoracion">
                        <label for="extraordinario">Muy buena</label>
                        <input type="radio" id="extraordinario" name="valoracion" value="excelente">
                    </li>
                    <li class="valoracion">
                        <label for="genial">Buena</label>
                        <input type="radio" id="genial" name="valoracion" value="buena">
                    </li>
                    <li class="valoracion">
                        <label for="normal">Regular</label>
                        <input type="radio" id="normal" name="valoracion" value="regular">
                    </li>
                    <li class="valoracion">
                        <label for="mal">Mala</label>
                        <input type="radio" id="mal" name="valoracion" value="mal">
                    </li>
                    <li class="valoracion" >
                        <label for="fatal">Muy mala</label>
                        <input type="radio" id="fatal" name="valoracion" value="fatal">
                    </li>
                </ul>
                <button type="submit" class="boton">Enviar encuesta</button>
                <button type="reset" class="boton">Limpiar encuesta</button>
            </fieldset>
        </form>
    </div>
    <script src="js/carrito.js"></script>
    <footer>Jelisa Iglesias</footer>
</body>





</html>