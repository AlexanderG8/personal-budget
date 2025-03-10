// Mi array
let movimientos = [];
        
// Formularios
const gastoForm = document.getElementById('gastoForm');
const resultadoBusqueda = document.getElementById('resultadoBusqueda');

// HU1 - Lista de nombres de movimientos
document.getElementById('listarNombresBtn').addEventListener('click', function() {
    // Mi función para listar los nombres de movimientos
    function obtenerNombresMovimientos(movs) {
        return movs.map(movimiento => movimiento.nombre);
    }
    
    const nombresMovimientos = obtenerNombresMovimientos(movimientos);
    
    if (nombresMovimientos.length === 0) {
        console.log("No hay movimientos registrados.");
    } else {
        console.log("Nombres de movimientos:", nombresMovimientos);
    }
});

// HU2 - Filtro de egresos mayores a 100
document.getElementById('filtrarEgresosBtn').addEventListener('click', function() {
    // Mi función pura para filtrar egresos mayores a 100
    function filtrarEgresosMayores(movs, limite) {
        return movs.filter(movimiento => 
            movimiento.tipo === 'egreso' && movimiento.monto > limite
        );
    }
    
    const egresosMayores = filtrarEgresosMayores(movimientos, 100);
    
    if (egresosMayores.length === 0) {
        console.log("No se encontraron egresos mayores a 100.");
    } else {
        console.log("Egresos mayores a 100:", egresosMayores);
    }
});

// HU3 - Busqueda de movimiento por nombre 
document.getElementById('searchBtn').addEventListener('click', function() {
    const nombreBuscado = document.getElementById('searchInput').value.trim().toLowerCase();
    
    if (nombreBuscado === '') {
        mostrarResultadoBusqueda("Por favor, ingrese un nombre para buscar.", false);
        return;
    }
    
    // Mi Función para buscar un movimiento por nombre
    function buscarMovimientoPorNombre(movs, nombre) {
        return movs.find(
            movimiento => movimiento.nombre.toLowerCase().includes(nombre)
        );
    }
    
    const movimientoEncontrado = buscarMovimientoPorNombre(movimientos, nombreBuscado);
    
    if (movimientoEncontrado) {
        mostrarResultadoBusqueda(`Movimiento encontrado: ${movimientoEncontrado.nombre} - ${movimientoEncontrado.tipo} - ${movimientoEncontrado.monto.toFixed(2)}`, true);
    } else {
        mostrarResultadoBusqueda(`No se encontró ningún movimiento con el nombre "${nombreBuscado}".`, false);
    }
});

// Función para mostrar el resultado de la búsqueda
function mostrarResultadoBusqueda(mensaje, encontrado) {
    resultadoBusqueda.textContent = mensaje;
    resultadoBusqueda.style.display = 'block';
    
    if (encontrado) {
        resultadoBusqueda.className = 'resultado-encontrado';
    } else {
        resultadoBusqueda.className = 'resultado-no-encontrado';
    }
}

// Evento submit -> Esto actuará cuando de clic al boton Registrar Movimiento
gastoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const tipo = document.getElementById('tipo').value;
    const monto = parseFloat(document.getElementById('monto').value);
    
    document.getElementById('nombreError').textContent = '';
    document.getElementById('montoError').textContent = '';
    document.getElementById('successMessage').textContent = '';
    
    if (nombre === '') {
        document.getElementById('nombreError').textContent = 'El nombre no puede estar vacío.';
        return;
    }
    
    if (isNaN(monto) || monto <= 0) {
        document.getElementById('montoError').textContent = 'El monto debe ser un número mayor a cero.';
        return;
    }
    
    const movimiento = {
        nombre: nombre,
        tipo: tipo,
        monto: monto,
        fecha: new Date()
    };
    
    movimientos.push(movimiento);
    document.getElementById('successMessage').textContent = 'Movimiento registrado con éxito.';
    gastoForm.reset();
    actualizarTabla();
});

let totalIngresos = 0;
let totalEgresos = 0

// Actualizar mi tabla
function actualizarTabla() {
    const tbody = document.querySelector('#movimientosTable tbody');
    tbody.innerHTML = '';
    
    // Verificar si hay movimientos
    if (movimientos.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3" style="text-align: center;">No hay movimientos registrados.</td>';
        tbody.appendChild(row);
        return;
    }
    
    // Reseteo los totales
    totalIngresos = 0;
    totalEgresos = 0;
    
    // Map para crear las filas de la tabla
    movimientos.map(movimiento => {
        const row = document.createElement('tr');
        
        // Crear celda para el nombre
        const nombreCell = document.createElement('td');
        nombreCell.textContent = movimiento.nombre;
        row.appendChild(nombreCell);
        
        // Crear celda para el tipo
        const tipoCell = document.createElement('td');
        tipoCell.textContent = movimiento.tipo === 'ingreso' ? 'Ingreso' : 'Egreso';
        tipoCell.className = movimiento.tipo;
        row.appendChild(tipoCell);
        
        // Crear celda para el monto
        const montoCell = document.createElement('td');
        montoCell.textContent = `${movimiento.monto.toFixed(2)}`;
        montoCell.className = movimiento.tipo;
        row.appendChild(montoCell);
        
        //Suma de totales Ingresos y Egresos
        
        if(movimiento.tipo == "ingreso"){
            totalIngresos += movimiento.monto;
        }
        if(movimiento.tipo == "egreso"){
            totalEgresos += movimiento.monto;
        }

        // Agregar la fila a la tabla
        tbody.appendChild(row);
    });

    document.getElementById("ingresosTotal").innerText = `${totalIngresos.toFixed(2)}`;
    document.getElementById("egresosTotal").innerText = `${totalEgresos.toFixed(2)}`;

}

// Inicializar la tabla
actualizarTabla();

// Datos de ejemplo para pruebas
function cargarDatosEjemplo() {
    movimientos = [
        { nombre: "Salario quincenal", tipo: "ingreso", monto: 1500, fecha: new Date() },
        { nombre: "Compra supermercado", tipo: "egreso", monto: 120.50, fecha: new Date() },
        { nombre: "Pago renta", tipo: "egreso", monto: 450, fecha: new Date() },
        { nombre: "Comisión trabajo freelance", tipo: "ingreso", monto: 350, fecha: new Date() },
        { nombre: "Cena restaurante", tipo: "egreso", monto: 85.75, fecha: new Date() }
    ];
    actualizarTabla();
    console.log("Datos de ejemplo cargados:", movimientos);
}

// Cargar datos de ejemplo automáticamente
cargarDatosEjemplo();