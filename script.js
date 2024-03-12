const campoTexto = document.querySelector("#cambiarTexto");
const campoMensaje = document.querySelector("#mensajeEncriptado");

const matrizCodgo = [
    ["e", "enter"],  // índice 0
    ["i", "imes"],   // índice 1
    ["a", "ai"],     // índice 2
    ["o", "ober"],   // índice 3
    ["u", "ufat"],   // índice 4
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

    if (contieneMayusculas) {
        return "El texto no debe contener letras mayúsculas.";
    } else if (contieneNumeros) {
        return "El texto no debe contener números.";
    } else if (contieneSimbolos) {
        return "El texto no debe contener símbolos ni caracteres especiales.";
    } else if (estaVacio) {
        return "El texto no debe estar vacío.";
    }

    return "";
}

// ********************* BOTONES *********************

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

    try {
        await navigator.clipboard.writeText(texto);
        console.log("Texto copiado al portapapeles!");
    } catch (error) {
        console.error("Error al copiar el texto al portapapeles.", error);
    }
}