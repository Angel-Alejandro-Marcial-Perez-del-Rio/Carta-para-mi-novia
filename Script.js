let latidoActivo = true;
let latidoFactor = 1;
let latidoDelta = 0.02;

document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.getElementById("latidoCanvas");
    let ctx = canvas.getContext("2d");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function dibujarCorazon() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (latidoActivo) {
            latidoFactor += latidoDelta;
            if (latidoFactor > 1.5 || latidoFactor < 1) {
                latidoDelta *= -1;
            }
            dibujarTexto();
            requestAnimationFrame(dibujarCorazon);
        }
    }

    function dibujarTexto() {
        ctx.font = `${50 * latidoFactor}px 'Dancing Script', cursive`;
        ctx.fillStyle = "#d62828";
        ctx.textAlign = "center";
        ctx.fillText("💖 Espero te guste 💖", canvas.width / 2, canvas.height / 2);
    }

    dibujarCorazon();

    // Iniciar música de fondo al cargar la página
    let musica = document.getElementById("musicaFondo");
    musica.volume = 0.5;  // Ajusta el volumen (0.0 - 1.0)
    
    // Autoplay solo funciona después de interacción del usuario en algunos navegadores
    document.body.addEventListener("click", function() {
        musica.play();
    }, { once: true }); 

    generarCorazones(); // Llamamos a la función para generar corazones
});

/* Función para mostrar la carta */
function eliminarCorazonYTexto() {
    let sound = new Audio("click.mp3");  // Asegúrate de tener este archivo
    sound.play();

    latidoActivo = false;
    
    let texto = document.querySelector("canvas");
    texto.style.transition = "opacity 1s";
    texto.style.opacity = "0";

    setTimeout(() => {
        texto.style.display = "none";
        let carta = document.getElementById("cartaContainer");
        carta.style.display = "flex";
        carta.style.opacity = "0";
        setTimeout(() => carta.style.opacity = "1", 100);
    }, 1000);
}

/* Función para generar corazones flotando */
function generarCorazones() {
    setInterval(() => {
        let corazon = document.createElement("div");
        corazon.classList.add("corazon");
        corazon.innerHTML = "❤️";
        corazon.style.position = "absolute";
        corazon.style.left = Math.random() * 100 + "vw"; // Posición aleatoria en el ancho
        corazon.style.top = Math.random() * 100 + "vh";  // Posición aleatoria en toda la altura
        corazon.style.fontSize = (20 + Math.random() * 30) + "px"; // Tamaño variable
        corazon.style.color = "red";
        corazon.style.animation = "flotar 5s linear infinite";
        document.body.appendChild(corazon);
        setTimeout(() => corazon.remove(), 6000);
    }, 300);
}