const campoTexto = document.querySelector("#cambiarTexto");
const campoMensaje = document.querySelector("#mensajeEncriptado");

const matrizCodgo = [
    ["e", "enter"],  
    ["i", "imes"],   
    ["a", "ai"],     
    ["o", "ober"],   
    ["u", "ufat"],   
];

function encriptar(fraseEncriptada) {
    for (let i = 0; i < matrizCodgo.length; i++) {
        if (fraseEncriptada.includes(matrizCodgo[i][0])) {
            fraseEncriptada = fraseEncriptada.replaceAll(
                matrizCodgo[i][0],
                matrizCodgo[i][1]
            )
        }
    }
    return fraseEncriptada;
};

function desencriptar(fraseEncriptada) {
    let desencriptado = '';
    let i = 0;

    while (i < fraseEncriptada.length) {
        let coincidencia = false;

        for (let j = 0; j < matrizCodgo.length; j++) {
            const [original, encriptado] = matrizCodgo[j];
            if (fraseEncriptada.startsWith(encriptado, i)) {
                desencriptado += original;
                i += encriptado.length;
                coincidencia = true;
                break;
            }
        }

        if (!coincidencia) {
            desencriptado += fraseEncriptada[i];
            i++;
        }
    }
    return desencriptado;
}

function validarEntrada(texto) {
    const contieneMayusculas = /[A-Z]/.test(texto);
    const contieneNumeros = /[0-9]/.test(texto);
    const contieneSimbolos = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(texto);
    const estaVacio = texto.length === 0;
    const contieneTildes = /[\u00C0-\u00FF\u0300-\u036f]/g.test(texto);

    if (contieneMayusculas) {
        return "El texto no debe contener letras mayúsculas.";
    } else if (contieneNumeros) {
        return "El texto no debe contener números.";
    } else if (contieneSimbolos) {
        return "El texto no debe contener símbolos ni caracteres especiales.";
    } else if (estaVacio) {
        return "El texto no debe estar vacío.";
    } else if (contieneTildes) {
        return "El texto no debe contener tildes.";
    }

    return "";
}

// ****************** BOTONES *********************

function btnEncriptar() {
    const texto = campoTexto.value;
    const mensajeValidacion = validarEntrada(texto);

    if (mensajeValidacion) {
        campoMensaje.value = mensajeValidacion;
        campoTexto.focus();
        return;
    }

    const textoEncriptado = encriptar(texto);
    campoMensaje.value = textoEncriptado;
}

function btnLimpiar() {
    campoTexto.value = "";
    campoMensaje.value = "";
    campoTexto.focus();
}

function btnDesencriptar() {
    const texto = campoTexto.value;
    const mensajeValidacion = validarEntrada(texto);

    if (mensajeValidacion) {
        campoMensaje.value = mensajeValidacion;
        campoTexto.focus();
        return;
    }

    const textoDesencriptado = desencriptar(texto);
    campoMensaje.value = textoDesencriptado;
}

async function btnCopiar() {
    const mensajeEncriptado = document.getElementById("mensajeEncriptado");
    const texto = mensajeEncriptado.value;
    const botonCopiar = document.getElementById("botonCopiar");

    try {
        await navigator.clipboard.writeText(texto);
        botonCopiar.classList.add("btnCopiado");
        botonCopiar.textContent = "Texto Copiado";
        setTimeout(() => {
            botonCopiar.classList.remove("btnCopiado");
            botonCopiar.textContent = "Copiar Texto";
        }, 2000);
    } catch (error) {
        console.error("Error al copiar el texto al portapapeles.", error);
    }
}

// ****************** EVENTOS *********************

document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("btnMenu");
    let box = document.getElementById("indicacionesPopup");

    btn.addEventListener("click", function () {
        if (box.style.display === "none") {
            box.style.display = "block";            
        } else {
            box.style.display = "none";
        }
    });
});
