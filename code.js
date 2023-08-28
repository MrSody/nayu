window.addEventListener("load", function (event) {
    if (validateStart()) {
        main();
    }
});

let NUMCUESTIONNOW = 0;

// TEXTO original = 2034na7423yu4298
// TEXTO Cifrado = 2034qd7423bx4298
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

function main() {
    loadCuestion(NUMCUESTIONNOW);
}

function loadSection (dataSection) {
    document.getElementById("pregunta").innerHTML = `<p>${dataSection.pregunta}</p>`;
    var btnValidate = document.getElementById("btnValidate");

    btnValidate.onclick = function() {
        validateRespuesta(dataSection.respuesta);
    };
}

function loadCuestion(numCuestion) {
    let data = loadData();
    document.getElementById("error").classList.remove("show");

    if (Array.from(data).length >= numCuestion){
        return loadSection(data[numCuestion]);
    }
}

function loadData() {
    fetch('preguntas.json', {
        method: 'GET',
        mode: 'no-cors',
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data.preguntas;
    })
    .catch(error => {
        console.log("error ", error);
    });
}

function validateRespuesta(respuesta){
    let respuestaUser = document.getElementById("respuesta").value;
    
    if (respuestaUser === respuesta){
        loadCuestion(NUMCUESTIONNOW + 1);
    }

    document.getElementById("error").classList.add("show");
}