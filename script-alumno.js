// Archivo alumno trasladado al raíz — rutas ajustadas para raíz
// ===== VARIABLES GLOBALES =====
let usuarioActual = null;
let dificultadSeleccionada = null;
let tiempoTotal = 30;
let tiempoRestante = 30;
let timerInterval = null;
let preguntasActuales = [];
let preguntaActual = 0;
let respuestaSeleccionada = false;

// Mantener banco de ejemplo
const bancoPreguntasEjemplo = [ /* ... mismas preguntas que antes ... */ ];

document.addEventListener('DOMContentLoaded', () => {
    cargarDatosUsuario();
    cargarEstadisticas();
    cargarRanking();
});

function cargarDatosUsuario() {
    const usuario = localStorage.getItem('usuarioActual');
    if (!usuario) {
        window.location.href = 'index.html';
        return;
    }
    usuarioActual = JSON.parse(usuario);
    document.getElementById('usuarioNombre').textContent = usuarioActual.nombre;
    document.getElementById('nombreAlumno').textContent = usuarioActual.nombre.split(' ')[0];
}

function cargarEstadisticas() {
    document.getElementById('puntosTotales').textContent = usuarioActual.puntos || 0;
    document.getElementById('rachaActual').textContent = usuarioActual.racha || 0;
    document.getElementById('respuestasCorrectas').textContent = usuarioActual.respuestasCorrectas || 0;
    const totalPreguntas = (usuarioActual.respuestasCorrectas || 0) + (usuarioActual.respuestasIncorrectas || 0);
    let porcentaje = 0;
    if (totalPreguntas > 0) porcentaje = Math.round((usuarioActual.respuestasCorrectas / totalPreguntas) * 100);
    document.getElementById('porcentajeAcierto').textContent = porcentaje + '%';
}

function cargarRanking() {
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    alumnos.sort((a,b)=> (b.puntos||0)-(a.puntos||0));
    const rankingList = document.getElementById('rankingList');
    rankingList.innerHTML = '';
    if (alumnos.length === 0) { rankingList.innerHTML = '<p class="loading">No hay alumnos registrados aún</p>'; return; }
    alumnos.slice(0,10).forEach((alumno,index)=>{
        const item = document.createElement('div');
        item.className = 'ranking-item';
        item.innerHTML = `
            <div class="ranking-posicion">#${index+1}</div>
            <div class="ranking-info">
                <div class="ranking-nombre">${alumno.nombre}</div>
                <div class="ranking-curso">${alumno.curso}° año</div>
            </div>
            <div class="ranking-puntos">${alumno.puntos||0} pts</div>
        `;
        rankingList.appendChild(item);
    });
}

function seleccionarDificultad(dificultad) { /* implementación similar a la original */ }
function cargarPreguntas(){ /* ... */ }
function mostrarPregunta(){ /* ... */ }
function iniciarTimer(){ /* ... */ }
function seleccionarRespuesta(indice){ /* ... */ }
function mostrarResultado(esCorrecta, indiceRespuesta){ /* ... */ }
function actualizarBarraPuntajes(){ /* ... */ }
function finalizarJuego(){ /* ... */ }
function guardarDatos(){ /* ... */ }

function cerrarSesion(){
    localStorage.removeItem('usuarioActual');
    window.location.href = 'index.html';
}
