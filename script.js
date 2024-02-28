const campoTexto = document.querySelector("#textoEncriptado");
const campoMensaje = document.querySelector("#campoMensaje");

const matrizCode = [
    ['e', "enter"],  // índice 0
    ["i", 'imes'],   // índice 1
    ["a", "ai"],     // índice 2
    ['o', "ober"],   // índice 3
    ["u", "ufat"],   // índice 4
];

function btnEncriptar() {
    const texto = campoTexto.value.toLowerCase(); // Convertir a minúsculas
    const textoEncriptado = encriptar(texto);
    campoMensaje.value = textoEncriptado;
}

function encriptar(fraseEncriptada){
    for(let i = 0; i < matrizCode.length; i++){
        if(fraseEncriptada.includes(matrizCode[i][0])){
            fraseEncriptada = fraseEncriptada.replaceAll(
                matrizCode[i][0],
                matrizCode[i][1]
            )
        }
    }
    return fraseEncriptada;
};

function btnDesencriptar() {
    const texto = campoTexto.value.toLowerCase(); // Convertir a minúsculas
    const textoDesencriptado = desencriptar(texto); // Usar la función de desencriptación
    campoMensaje.value = textoDesencriptado; // Asignar el valor desencriptado al campo de mensaje
}

function desencriptar(fraseDesencriptada){
    for(let i = 0; i < matrizCode.length; i++){
        if(fraseDesencriptada.includes(matrizCode[i][0])){
            fraseDesencriptada = fraseDesencriptada.replaceAll(
                matrizCode[i][1],
                matrizCode[i][0]
            )
        }
    }
    return fraseDesencriptada;
}
