// Script mínimo para el panel de profesor — adaptado a raíz
document.addEventListener('DOMContentLoaded', () => {
    cargarDatosUsuario();
});

function cargarDatosUsuario(){
    const usuario = localStorage.getItem('usuarioActual');
    if (!usuario) { window.location.href = 'index.html'; return; }
    const profesor = JSON.parse(usuario);
    if (profesor.rol !== 'profesor') { window.location.href = 'index.html'; return; }
    document.getElementById('usuarioNombre').textContent = profesor.nombre;
    const nombreElem = document.getElementById('nombreProfesor');
    const materiaElem = document.getElementById('materiaProfesor');
    if (nombreElem) nombreElem.textContent = profesor.nombre;
    if (materiaElem) materiaElem.textContent = profesor.materia || '';
}

function cerrarSesion(){
    localStorage.removeItem('usuarioActual');
    window.location.href = 'index.html';
}

function cambiarTab(id){
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.remove('active'));
    const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b=>b.getAttribute('onclick')&&b.getAttribute('onclick').includes(id));
    if (btn) btn.classList.add('active');
    const content = document.getElementById('tab-'+id);
    if (content) content.classList.add('active');
}

function abrirModalCrearPregunta(){
    const m = document.getElementById('modalCrearPregunta'); if (m) m.style.display = 'flex';
}

function abrirModalCrearSala(){
    const m = document.getElementById('modalCrearSala'); if (m) m.style.display = 'flex';
}

function cerrarModal(id){
    const m = document.getElementById(id); if (m) m.style.display = 'none';
}
