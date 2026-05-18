// ===== VARIABLES GLOBALES =====
let usuarioActual = null;
let rolActual = null;

// ===== INICIALIZACION =====
document.addEventListener('DOMContentLoaded', () => {
    verificarUsuarioLogueado();
    configurarEventos();
});

// ===== CONFIGURAR EVENTOS =====
function configurarEventos() {
    // Botones de rol
    document.getElementById('alumnoBtn').addEventListener('click', () => seleccionarRol('alumno'));
    document.getElementById('profesorBtn').addEventListener('click', () => seleccionarRol('profesor'));

    // Formularios
    document.getElementById('alumnoForm').addEventListener('submit', (e) => {
        e.preventDefault();
        registrarAlumno();
    });

    document.getElementById('profesorForm').addEventListener('submit', (e) => {
        e.preventDefault();
        registrarProfesor();
    });
}

// ===== SELECCIONAR ROL =====
function seleccionarRol(rol) {
    rolActual = rol;

    // Actualizar botones activos
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    if (rol === 'alumno') {
        document.getElementById('alumnoBtn').classList.add('active');
        mostrarAuth('alumnoAuth');
    } else if (rol === 'profesor') {
        document.getElementById('profesorBtn').classList.add('active');
        mostrarAuth('profesorAuth');
    }
}

// ===== MOSTRAR SECCIÓN DE AUTENTICACIÓN =====
function mostrarAuth(seccion) {
    document.querySelectorAll('.auth-section').forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById(seccion).style.display = 'block';
}

// ===== VOLVER =====
function volver() {
    rolActual = null;
    document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.auth-section').forEach(el => el.style.display = 'none');
}

// ===== REGISTRAR ALUMNO =====
function registrarAlumno() {
    const nombre = document.getElementById('alumnoNombre').value.trim();
    const curso = document.getElementById('alumnoCurso').value;
    const email = document.getElementById('alumnoEmail').value.trim();

    if (!nombre || !curso || !email) {
        mostrarAlerta('Por favor completa todos los campos', 'error');
        return;
    }

    const alumno = {
        id: generarID(),
        nombre,
        curso,
        email,
        rol: 'alumno',
        puntos: 0,
        racha: 0,
        respuestasCorrectas: 0,
        respuestasIncorrectas: 0,
        fechaRegistro: new Date().toLocaleDateString()
    };

    guardarAlumno(alumno);
    usuarioActual = alumno;

    mostrarAlerta('¡Bienvenido ' + nombre + '!', 'success');
    
    setTimeout(() => {
        irAPanel();
    }, 1500);
}

// ===== REGISTRAR PROFESOR =====
function registrarProfesor() {
    const nombre = document.getElementById('profesorNombre').value.trim();
    const materia = document.getElementById('profesorMateria').value.trim();
    const email = document.getElementById('profesorEmail').value.trim();
    const password = document.getElementById('profesorPassword').value.trim();

    if (!nombre || !materia || !email || !password) {
        mostrarAlerta('Por favor completa todos los campos', 'error');
        return;
    }

    if (password.length < 6) {
        mostrarAlerta('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
    }

    const profesor = {
        id: generarID(),
        nombre,
        materia,
        email,
        password: btoa(password), // Codificación básica (no es segura para producción)
        rol: 'profesor',
        preguntasCreadas: 0,
        salaActiva: null,
        fechaRegistro: new Date().toLocaleDateString()
    };

    guardarProfesor(profesor);
    usuarioActual = profesor;

    mostrarAlerta('¡Bienvenido profesor ' + nombre + '!', 'success');
    
    setTimeout(() => {
        irAPanel();
    }, 1500);
}

// ===== GUARDAR ALUMNO EN LOCALSTORAGE =====
function guardarAlumno(alumno) {
    const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    alumnos.push(alumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    localStorage.setItem('usuarioActual', JSON.stringify(alumno));
}

// ===== GUARDAR PROFESOR EN LOCALSTORAGE =====
function guardarProfesor(profesor) {
    const profesores = JSON.parse(localStorage.getItem('profesores')) || [];
    profesores.push(profesor);
    localStorage.setItem('profesores', JSON.stringify(profesores));
    localStorage.setItem('usuarioActual', JSON.stringify(profesor));
}

// ===== VERIFICAR USUARIO LOGUEADO =====
function verificarUsuarioLogueado() {
    const usuario = localStorage.getItem('usuarioActual');
    if (usuario) {
        usuarioActual = JSON.parse(usuario);
        irAPanel();
    }
}

// ===== GENERAR ID ÚNICO =====
function generarID() {
    return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ===== MOSTRAR ALERTA =====
function mostrarAlerta(mensaje, tipo) {
    const alerta = document.createElement('div');
    alerta.className = `alerta alerta-${tipo}`;
    alerta.textContent = mensaje;
    alerta.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${tipo === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => alerta.remove(), 300);
    }, 3000);
}

// ===== IR AL PANEL =====
function irAPanel() {
    if (usuarioActual.rol === 'alumno') {
        window.location.href = 'alumno.html';
    } else if (usuarioActual.rol === 'profesor') {
        window.location.href = 'profesor.html';
    }
}

// ===== CERRAR SESIÓN =====
function cerrarSesion() {
    localStorage.removeItem('usuarioActual');
    window.location.href = 'index.html';
}

// Agregar estilos CSS para animaciones de alerta
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
