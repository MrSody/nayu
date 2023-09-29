window.addEventListener("load", function (event) {

    if (!validateStart()) {
        this.document.getElementById("body").classList.add("fondoError");
        this.document.getElementById("main").classList.add("hidden");
    } else {
        let cookie = obtenerCookie();

        if (cookie != null){
            NUMCUESTIONNOW = cookie;
            startCuestions();
        } else {
            this.document.getElementById("start").classList.remove("hidden");
        }
    }
});

let NUMCUESTIONNOW = 1;
let amorWidth = 70;
let amorHeight = 50;
let tristezaWidth = 90;
let tristezaHeight = 50;

function validateStart () {
    const urlParams = new URLSearchParams(window.location.search);

    // Obtén un parámetro específico
    const codeSecret = urlParams.get('codeSecret');

    return "2034qd7423bx4298" === cifrar(codeSecret, 3);
}

function validateEnd () {
    let codeSecret = document.getParameterByName('codeSecret');
    return "2034qd7423bx4298" === cifrar(codeSecret, 3);
}

function cifrar(mensaje, desplazamiento) {
    let mensajeCifrado = "";

    if (mensaje == null){
        return mensajeCifrado;
    }
  
    for (const element of mensaje) {
      let char = element;
      if (char.match(/[a-z]/i)) {
        const charCode = char.charCodeAt(0);
        const esMayuscula = charCode >= 65 && charCode <= 90;
        const base = esMayuscula ? 65 : 97;
        const cifradoCharCode = ((charCode - base + desplazamiento) % 26) + base;
        mensajeCifrado += String.fromCharCode(cifradoCharCode);
      } else {
        mensajeCifrado += char;
      }
    }
    return mensajeCifrado;
}

function startCuestions(){
    document.getElementById("start").classList.add("hidden");
    document.getElementById("preguntas").classList.remove("hidden");
    loadCuestion(NUMCUESTIONNOW);
}

function loadSection (dataSection) {
    document.getElementById("Pregunta").innerHTML = `<h1>${dataSection.pregunta}</h1>`;

    let btnValidate = document.getElementById("btnValidate");

    btnValidate.onclick = function() {
        validateRespuesta(dataSection.respuesta);
    };
}

function loadCuestion(numCuestion) {
    let data = loadData();
    document.getElementById("error").classList.add("hidden");

    if (Array.from(data).length >= numCuestion){
        saveCookie(numCuestion);
        return loadSection(data[numCuestion - 1]);
    } else {
        document.getElementById("preguntas").classList.add("hidden");
        document.getElementById("pasoOne").classList.remove("hidden");
    }
}

function validateRespuesta(respuesta){
    let respuestaUser = document.getElementById("respuesta").value;
    document.getElementById("respuesta").value = "";

    document.getElementById("error").classList.add("hidden");
    document.getElementById("correcto").classList.add("hidden");
    
    if (respuestaUser.toLowerCase().trim() === respuesta){
        document.getElementById("correcto").classList.remove("hidden");
        loadCuestion(++NUMCUESTIONNOW);
    } else {
        document.getElementById("error").classList.remove("hidden");
    }
}

function tristeOne(){
    document.getElementById("pasoOnePregunta").innerHTML = "Se que no lo quieres, no quieres estar triste. Elige bien...";
}

function crecerAmor(){
    let btnAmor = document.getElementById("amor");

    amorWidth += 10;
    amorHeight += 5;

    btnAmor.style.width = `${amorWidth}px`;
    btnAmor.style.height = `${amorHeight}px`;

    let btnTristeza = document.getElementById("triste");

    tristezaWidth -= 5;
    tristezaHeight -= 2;

    btnTristeza.style.width = `${tristezaWidth}px`;
    btnTristeza.style.height = `${tristezaHeight}px`;

    if (Number(btnAmor.style.width.replace("px", "")) >= window.innerWidth){
        document.getElementById("pasoOne").classList.add("hidden");
        document.getElementById("pasoTwo").classList.remove("hidden");
        document.getElementById("body").classList.add("fondoMuelle");
    }
}

function pasoThree(){
    document.getElementById("pasoTwo").classList.add("hidden");
    document.getElementById("pasoThree").classList.remove("hidden");
}

function pasoFour(){
    document.getElementById("pasoThree").classList.add("hidden");
    document.getElementById("pasoFour").classList.remove("hidden");
}

function saveCookie(numCuestion){
    // Define la fecha de expiración de la cookie (opcional)
    let fechaExpiracion = new Date();
    fechaExpiracion.setDate(fechaExpiracion.getDate() + 20);

    let cookieString = "numCuestion=" + encodeURIComponent(numCuestion);
    if (fechaExpiracion) {
        cookieString += "; expires=" + fechaExpiracion.toUTCString();
    }

    // Asigna la cadena de cookie al documento
    document.cookie = cookieString;
}

function obtenerCookie() {
    let dataCookie = document.cookie.split("=");

    if (dataCookie[0].trim() === "numCuestion") {
        return dataCookie[1];
    }
    return null;
}

function loadData(){
    return [
        {
            "pregunta": "¿Cuál es el color que no existe?",
            "respuesta": "transparente",
        },
        {
            "pregunta": "¿A quién le dicen Alien?",
            "respuesta": "v",
        },
        {
            "pregunta": "¿Tiene famosa memoria, gran tamaño y dura piel y la nariz más grandota, que en el mundo pueda haber?",
            "respuesta": "elefante",
        },
        {
            "pregunta": "¿Quién se toma muchas fotos comiendo?",
            "respuesta": "jin",
        },
        {
            "pregunta": "¿Por un caminito, va caminando un bicho. El nombre del bicho ya te lo he dicho?",
            "respuesta": "vaca",
        },
        {
            "pregunta": "Verde por fuera, suave por dentro, en el jardín del aguacate me encuentro. no soy fruto, ni soy parte del árbol, Juntos caminamos, fui regalo. ¿Quién soy yo? Descúbrelo mientras caminas.",
            "respuesta": "medias de aguacate",
        },
        {
            "pregunta": "¿Orejas largas, rabo cortito, corro y salto muy ligerito?",
            "respuesta": "conejo",
        },
        {
            "pregunta": "En el corazón de la música brillamos, siete estrellas juntas nos encontramos. ¿Quiénes somos en este escenario, que en el arte de la música siempre brillamos?",
            "respuesta": "bts",
        },
        {
            "pregunta": "¿En rincones y entre ramas mis redes voy construyendo, para que moscas incautas, en ellas vayan cayendo?",
            "respuesta": "araña",
        },
        {
            "pregunta": "De los 4 chicos en una carrera de atletismo se sabe que suga ha llegado inmediatamente detrás de jimin y jin ha llegado en medio de v y suga. <br> ¿Dime el orden de llegada de cada uno? <br> (separa cada uno con guiones( - ))",
            "respuesta": "jimin - suga - jin - v",
        },
        {
            "pregunta": "¿Es la reina de los mares, su dentadura es muy buena, y por no ir nunca vacía, siempre dicen que va llena?",
            "respuesta": "ballena",
        },
        {
            "pregunta": "Nuestros álbumes cuentan una historia oculta, en las notas y los MV, una trama tumultuosa. el amor y el crecimiento son centrales, ¿Qué concepto llevamos en nuestros rituales, como se llama la era?",
            "respuesta": "hyyh",
        },
        {
            "pregunta": "¿Entre la lluvia y el sol, un arco a todo color?",
            "respuesta": "arcoiris",
        },
        {
            "pregunta": "Descifra este mensaje oculto de BTS: <br> L, E, H, A, O, V, E, N, A, M, Y, G, P, S, L, Z, F <br> ¡Espero que encuentres el mensaje especial que se oculta en estas letras!",
            "respuesta": "love myself",
        },
        {
            "pregunta": "Lana sube, lana baja ¿Qué es?",
            "respuesta": "navaja",
        },
        {
            "pregunta": "BTS es conocido por sus letras significativas. Aquí tienes un acertijo que forma una frase inspiradora a partir de las iniciales de sus canciones: <br> 'Porque Juntos Alcanzamos Sueños En Realidad' <br> ¡Espero que encuentres estas palabras alentadoras en este acertijo!",
            "respuesta": "porque juntos alcanzamos sueños en realidad.",
        },
        {
            "pregunta": "No es joya ni prenda, pero es valioso en verdad, un regalo que ilumina mentes, sin cesar. siete estrellas que con magia te atraparan. ¿Qué obsequio encantado, sin necesidad de conjuro, Qué regalo especial será?",
            "respuesta": "libro",
        },
        {
            "pregunta": "BTS tiene una fórmula que es una quimica especial:  JM + Jk = ?. ¿Puedes descifrar qué formula secreta es, ademas la tenemos? ¡Espero que encuentres el significado detrás de esta ecuación especial!",
            "respuesta": "amor",
        },
        {
            "pregunta": "Si el cielo esta oscuro y tormentoso, nosotros juntos podremos volverlo claro y despejado. Sin ser salvajes ¿Ya sabes la cancion cielo?",
            "respuesta": "24/7=heaven",
        },
    ];
}