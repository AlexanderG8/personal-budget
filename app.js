// Constructor Movimiento
function Movimiento(nombre, tipo, monto) {
    // Validamos
    if (!nombre || nombre.trim() === '') {
        throw new Error('El nombre no puede estar vacío');
    }
    if (tipo !== 'ingreso' && tipo !== 'egreso') {
        throw new Error('Tipo de movimiento inválido');
    }
    if (isNaN(monto) || monto <= 0) {
        throw new Error('El monto debe ser un número mayor a cero');
    }

    this.nombre = nombre.trim();
    this.tipo = tipo;
    this.monto = parseFloat(monto);
    this.fecha = new Date();
}

// Método formatMonto (Prototype) de la función constructora Movimiento
Movimiento.prototype.formatMonto = function() {
    return this.monto.toFixed(2) // Formatear el número con 2 decimales;
};

Movimiento.prototype.render = function() {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${this.nombre}</td>
        <td class="${this.tipo}">${this.tipo === 'ingreso' ? 'Ingreso' : 'Egreso'}</td>
        <td class="${this.tipo}">${this.formatMonto()}</td>
    `;
    return row;
};

let movimientos = [];

// Evento del formulario
gastoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const tipo = document.getElementById('tipo').value;
    const monto = document.getElementById('monto').value;

    document.getElementById('nombreError').textContent = '';
    document.getElementById('montoError').textContent = '';
    document.getElementById('successMessage').textContent = '';

    try {
        const movimiento = new Movimiento(nombre, tipo, monto);
        movimientos.push(movimiento);
        document.getElementById('successMessage').textContent = 'Movimiento registrado con éxito.';
        gastoForm.reset(); // Con esto limpio la tabla
        actualizarTabla(); // Luego actualizo la tabla
    } catch (error) {
        if (error.message.includes('nombre')) {
            document.getElementById('nombreError').textContent = error.message;
        } else if (error.message.includes('monto')) {
            document.getElementById('montoError').textContent = error.message;
        }
    }
});

// ActualizarTabla
function actualizarTabla() {
    const tbody = document.querySelector('#movimientosTable tbody');
    tbody.innerHTML = '';

    if (movimientos.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="3" style="text-align: center;">No hay movimientos registrados.</td>';
        tbody.appendChild(row);
        return;
    }

    let totalIngresos = 0;
    let totalEgresos = 0;

    movimientos.forEach(movimiento => {
        tbody.appendChild(movimiento.render());

        if (movimiento.tipo === 'ingreso') {
            totalIngresos += movimiento.monto;
        } else {
            totalEgresos += movimiento.monto;
        }
    });

    document.getElementById("ingresosTotal").innerText = totalIngresos.toFixed(2);
    document.getElementById("egresosTotal").innerText = totalEgresos.toFixed(2);
}

// Función CargarDatosEjemplo
function cargarDatosEjemplo() {
    movimientos = [
        new Movimiento("Salario quincenal", "ingreso", 1500),
        new Movimiento("Compra supermercado", "egreso", 120.50),
        new Movimiento("Pago renta", "egreso", 450),
        new Movimiento("Comisión trabajo freelance", "ingreso", 350),
        new Movimiento("Cena restaurante", "egreso", 85.75)
    ];
    actualizarTabla();
    console.log("Datos de ejemplo cargados:", movimientos);
}

// Método toCard (Prototype) de la función constructora Movimiento
Movimiento.prototype.toCard = function() {
    return `
        <div class="bg-gray-50 p-3 rounded mb-2 flex justify-between items-center">
            <span class="font-medium">${this.nombre}</span>
            <span class="${this.tipo === 'ingreso' ? 'text-green-600' : 'text-red-600'} font-bold">
                ${this.formatMonto()}
            </span>
        </div>
    `;
};

// Evento del botón listarNombres
document.getElementById('listarNombresBtn').addEventListener('click', function() {
    const listaNombresResult = document.getElementById('listaNombresResult');

    if (movimientos.length === 0) {
        listaNombresResult.innerHTML = `
            <div class="text-center text-gray-600">
                No hay movimientos registrados.
            </div>
        `;
    } else {
        const nombresList = movimientos.map(mov =>
            `<li class="py-2 border-b last:border-0">${mov.nombre}</li>`
        ).join('');

        listaNombresResult.innerHTML = `
            <h3 class="text-lg font-semibold mb-3">Lista de Movimientos</h3>
            <ul class="list-none">${nombresList}</ul>
        `;
    }

    listaNombresResult.classList.remove('hidden');
    document.getElementById('filtroEgresosResult').classList.add('hidden');
});

document.getElementById('filtrarEgresosBtn').addEventListener('click', function() {
    const filtroEgresosResult = document.getElementById('filtroEgresosResult');
    const egresosFiltrados = movimientos.filter(mov =>
        mov.tipo === 'egreso' && mov.monto > 100
    );

    if (egresosFiltrados.length === 0) {
        filtroEgresosResult.innerHTML = `
            <div class="text-center text-gray-600">
                No se encontraron egresos mayores a 100.
            </div>
        `;
    } else {
        filtroEgresosResult.innerHTML = `
            <h3 class="text-lg font-semibold mb-3">Egresos mayores a 100</h3>
            <div class="space-y-2">
                ${egresosFiltrados.map(mov => mov.toCard()).join('')}
            </div>
        `;
    }

    filtroEgresosResult.classList.remove('hidden');
    document.getElementById('listaNombresResult').classList.add('hidden');
});

// Función de buscar
document.getElementById('searchBtn').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput');
    const resultadoBusqueda = document.getElementById('resultadoBusqueda');
    const nombreBuscado = searchInput.value.trim().toLowerCase();

    if (nombreBuscado === '') {
        resultadoBusqueda.innerHTML = `
            <div class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
                Por favor, ingrese un nombre para buscar.
            </div>
        `;
        resultadoBusqueda.style.display = 'block';
        return;
    }

    const movimientoEncontrado = movimientos.find(
        movimiento => movimiento.nombre.toLowerCase().includes(nombreBuscado)
    );

    if (movimientoEncontrado) {
        resultadoBusqueda.innerHTML = `
            <div class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
                <h4 class="font-bold">Movimiento encontrado:</h4>
                ${movimientoEncontrado.toCard()}
            </div>
        `;
    } else {
        resultadoBusqueda.innerHTML = `
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                No se encontró ningún movimiento con el nombre "${nombreBuscado}".
            </div>
        `;
    }

    resultadoBusqueda.style.display = 'block';
});