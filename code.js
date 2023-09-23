window.addEventListener("load", function (event) {

    if (!validateStart()) {
        this.document.getElementById("body").classList.add("fondoError");
        this.document.getElementById("main").classList.add("hidden");
    } else {
        let cookie = obtenerCookie();

        if (cookie != null){
            NUMCUESTIONNOW = cookie;
            loadCuestion(NUMCUESTIONNOW);
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
        document.getElementById("endGame").classList.remove("hidden");
    }
}

function validateRespuesta(respuesta){
    let respuestaUser = document.getElementById("respuesta").value;
    document.getElementById("respuesta").value = "";

    document.getElementById("error").classList.add("hidden");
    document.getElementById("correcto").classList.add("hidden");
    
    if (respuestaUser === respuesta){
        document.getElementById("correcto").classList.remove("hidden");
        loadCuestion(++NUMCUESTIONNOW);
    } else {
        document.getElementById("error").classList.remove("hidden");
    }
}

function tristeOne(){
    document.getElementById("endGame").classList.add("hidden");
    document.getElementById("pasoOne").classList.remove("hidden");
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
        document.getElementById("endGame").classList.add("hidden");
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
    document.cookie.split(";").forEach((cookie) => {
        console.log(cookie);
        let dataCookie = cookie.split("=");
        if (dataCookie[0].trim() === "numCuestion") {
            return dataCookie[1];
        }
    });
    return null;
}

function loadData(){
    return [
        {
            "pregunta": "esto es una prueba 1",
            "respuesta": "test",
        },
        {
            "pregunta": "esto es una prueba 2",
            "respuesta": "test2",
        }
    ];
}