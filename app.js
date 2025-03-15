let movimientos = [];

// Constructor base Movimiento
function Movimiento(nombre, monto) {
    this.nombre = nombre;
    this.monto = parseFloat(monto);
    this.fecha = new Date();
}

// Métodos compartidos en el prototipo de Movimiento
Movimiento.prototype.validar = function() {
    if (!this.nombre || this.nombre.trim() === '') {
        throw new Error('El nombre no puede estar vacío');
    }
    if (isNaN(this.monto) || this.monto <= 0) {
        throw new Error('El monto debe ser un número mayor a cero');
    }
};

Movimiento.prototype.formatMonto = function() {
    return this.monto.toFixed(2);
};

Movimiento.prototype.render = function() {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">${this.nombre}</td>
        <td class="px-6 py-4 whitespace-nowrap">${this.getTipo()}</td>
        <td class="px-6 py-4 whitespace-nowrap font-medium ${this.getColorClase()}">${this.formatMonto()}</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <button class="text-blue-600 hover:text-blue-900 edit-btn mr-2">
                <i class="fas fa-edit"></i> Editar
            </button>
            <button class="text-red-600 hover:text-red-900 delete-btn">
                <i class="fas fa-trash"></i> Eliminar
            </button>
        </td>
    `;

    const editBtn = row.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => this.editar());

    const deleteBtn = row.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => this.eliminar());

    return row;
};

Movimiento.prototype.editar = function() {
    const nombre = document.getElementById('nombre');
    const monto = document.getElementById('monto');
    const tipo = document.getElementById('tipo');

    nombre.value = this.nombre;
    monto.value = this.monto;
    tipo.value = this instanceof Ingreso ? 'ingreso' : 'egreso';

    // Eliminar el movimiento actual
    const index = movimientos.indexOf(this);
    if (index > -1) {
        movimientos.splice(index, 1);
    }

    // Hacer scroll al formulario
    document.getElementById('gastoForm').scrollIntoView({ behavior: 'smooth' });
};

// Método para eliminar movimiento
Movimiento.prototype.eliminar = function() {
    if (confirm('¿Está seguro de eliminar este movimiento?')) {
        const index = movimientos.indexOf(this);
        if (index > -1) {
            movimientos.splice(index, 1);
            guardarEnLocalStorage(); // Agregar en el localStorage
            actualizarTabla();

            const successMessage = document.getElementById('successMessage');
            successMessage.textContent = 'Movimiento eliminado con éxito';
            successMessage.className = 'text-green-600 text-sm mt-2 text-center';

            setTimeout(() => {
                successMessage.textContent = '';
            }, 3000);
        }
    }
};

// Constructor Ingreso
function Ingreso(nombre, monto) {
    Movimiento.call(this, nombre, monto);
}

// Heredar de Movimiento
Ingreso.prototype = Object.create(Movimiento.prototype);
Ingreso.prototype.constructor = Ingreso;

// Métodos específicos de Ingreso
Ingreso.prototype.getTipo = function() {
    return 'Ingreso';
};

Ingreso.prototype.getColorClase = function() {
    return 'text-green-600';
};

// Constructor Egreso
function Egreso(nombre, monto) {
    Movimiento.call(this, nombre, monto);
}

// Heredar de Movimiento
Egreso.prototype = Object.create(Movimiento.prototype);
Egreso.prototype.constructor = Egreso;

// Métodos específicos de Egreso
Egreso.prototype.getTipo = function() {
    return 'Egreso';
};

Egreso.prototype.getColorClase = function() {
    return 'text-red-600';
};

// Agregar método de cálculo de totales al prototipo de Movimiento
Movimiento.prototype.actualizarTotales = function(totales) {
    debugger
    if (this instanceof Ingreso) {
        totales.ingresos += this.monto;
    } else if (this instanceof Egreso) {
        totales.egresos += this.monto;
    }
};

// Actualizar la función actualizarTabla
function actualizarTabla() {
    const tbody = document.querySelector('#movimientosTable tbody');
    tbody.innerHTML = '';

    if (movimientos.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="3" class="px-6 py-4 text-center text-gray-500">
                No hay movimientos registrados.
            </td>`;
        tbody.appendChild(row);
        return;
    }

    let totalIngresos = 0;
    let totalEgresos = 0;

    movimientos.forEach(movimiento => {
        tbody.appendChild(movimiento.render());

        // Calcular totales basado en la instancia del movimiento
        if (movimiento instanceof Ingreso) {
            totalIngresos += parseFloat(movimiento.monto);
        } else if (movimiento instanceof Egreso) {
            totalEgresos += parseFloat(movimiento.monto);
        }
    });

    // Actualiza totales
    document.getElementById("ingresosTotal").innerText = totalIngresos.toFixed(2);
    document.getElementById("egresosTotal").innerText = totalEgresos.toFixed(2);
    // animarContador(document.getElementById("ingresosTotal"), totalIngresos);
    // animarContador(document.getElementById("egresosTotal"), totalEgresos);

    // Actualizar gráfico
    actualizarGrafico(totalIngresos, totalEgresos);
}

// Función para animar los contadores
// function animarContador(elemento, valorFinal) {
//     const duracion = 500; // duración en milisegundos
//     const inicio = parseFloat(elemento.innerText) || 0;
//     const diferencia = valorFinal - inicio;
//     const incremento = diferencia / (duracion / 16); // 60fps
//     let valorActual = inicio;

//     const animar = () => {
//         valorActual += incremento;
//         if ((incremento > 0 && valorActual >= valorFinal) ||
//             (incremento < 0 && valorActual <= valorFinal)) {
//             elemento.innerText = valorFinal.toFixed(2);
//             return;
//         }
//         elemento.innerText = valorActual.toFixed(2);
//         requestAnimationFrame(animar);
//     };

//     requestAnimationFrame(animar);
// }

// Evento submit
gastoForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const tipo = document.getElementById('tipo').value;
    const monto = document.getElementById('monto').value;

    document.getElementById('nombreError').textContent = '';
    document.getElementById('montoError').textContent = '';
    document.getElementById('successMessage').textContent = '';

    try {
        const movimiento = tipo === 'ingreso'
            ? new Ingreso(nombre, monto)
            : new Egreso(nombre, monto);

        movimiento.validar();
        movimientos.push(movimiento);
        guardarEnLocalStorage(); // Agregar en el localStorage

        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = 'Movimiento registrado con éxito';
        successMessage.className = 'text-green-600 text-sm mt-2 text-center';

        gastoForm.reset();
        actualizarTabla();

        setTimeout(() => {
            successMessage.textContent = '';
        }, 3000);
    } catch (error) {
        if (error.message.includes('nombre')) {
            document.getElementById('nombreError').textContent = error.message;
        } else if (error.message.includes('monto')) {
            document.getElementById('montoError').textContent = error.message;
        }
    }
});

// Función CargarDatosEjemplo
function cargarDatosEjemplo() {
    movimientos = [
        new Ingreso("Salario quincenal", 1500),
        new Egreso("Compra supermercado", 120.50),
        new Egreso("Pago renta", 450),
        new Ingreso("Comisión trabajo freelance", 350),
        new Egreso("Cena restaurante", 85.75)
    ];
    actualizarTabla();
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
        mov.getTipo() === 'Egreso' && mov.monto > 100
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

// Función para ordenar movimientos
function ordenarMovimientos(orden = 'desc') {
    movimientos.sort((a, b) => {
        return orden === 'desc' ? b.monto - a.monto : a.monto - b.monto;
    });
    actualizarTabla();
}

// Botones de ordenamiento en el encabezado de la tabla
document.querySelector('#movimientosTable thead tr').innerHTML += `
    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Ordenar por monto
        <button id="ordenAsc" class="ml-2 text-blue-600 hover:text-blue-900">
            <i class="fas fa-sort-up"></i>
        </button>
        <button id="ordenDesc" class="ml-2 text-blue-600 hover:text-blue-900">
            <i class="fas fa-sort-down"></i>
        </button>
    </th>
`;

document.getElementById('ordenAsc').addEventListener('click', () => ordenarMovimientos('asc'));
document.getElementById('ordenDesc').addEventListener('click', () => ordenarMovimientos('desc'));

// Botón de limpiar todo
document.getElementById('limpiarTodo').addEventListener('click', function() {
    if (confirm('¿Está seguro de eliminar todos los movimientos? Esta acción no se puede deshacer.')) {
        // Limpiar array de movimientos
        movimientos = [];
        guardarEnLocalStorage(); // Guarda en el localStorage
        // Limpia tabla y totales
        actualizarTabla();

        // Limpia lista de nombres
        document.getElementById('listaNombresResult').innerHTML = '';
        document.getElementById('listaNombresResult').classList.add('hidden');

        // Limpia egresos filtrados
        document.getElementById('filtroEgresosResult').innerHTML = '';
        document.getElementById('filtroEgresosResult').classList.add('hidden');

        // Limpia búsqueda
        document.getElementById('searchInput').value = '';
        document.getElementById('resultadoBusqueda').innerHTML = '';
        document.getElementById('resultadoBusqueda').style.display = 'none';

        //Limpia Totales
        document.getElementById("ingresosTotal").innerText = "";
        document.getElementById("egresosTotal").innerText = "";

        // Muestra mensaje de éxito
        const successMessage = document.getElementById('successMessage');
        successMessage.textContent = 'Todos los movimientos han sido eliminados';
        successMessage.className = 'text-green-600 text-sm mt-2 text-center';

        setTimeout(() => {
            successMessage.textContent = '';
        }, 3000);
    }
});

//PROYECTO MODULO 2
//HU1: Guardar datos en el LocalStorage

// Función para guardar en localStorage
function guardarEnLocalStorage() {
    const movimientosData = movimientos.map(mov => ({
        nombre: mov.nombre,
        monto: mov.monto,
        fecha: mov.fecha,
        tipo: mov instanceof Ingreso ? 'ingreso' : 'egreso'
    }));
    localStorage.setItem('movimientos', JSON.stringify(movimientosData));
}

// Función para cargar desde localStorage
function cargarDeLocalStorage() {
    const movimientosData = localStorage.getItem('movimientos');
    if (movimientosData) {
        const datos = JSON.parse(movimientosData);
        debugger
        movimientos = datos.map(mov => {
            const movimiento = mov.tipo === 'ingreso'
                ? new Ingreso(mov.nombre, mov.monto)
                : new Egreso(mov.nombre, mov.monto);
            movimiento.fecha = new Date(mov.fecha);
            return movimiento;
        });
        actualizarTabla();
    }
}

// Cargar datos al iniciar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarDeLocalStorage();
});

// HU2: Grafica de Balance General
// Función para actualizar el gráfico
function actualizarGrafico(ingresos, egresos) {
    const ctx = document.getElementById('balanceChart').getContext('2d');

    // Si existe un grafico
    if (window.balanceChart instanceof Chart) {
        // Destruye grafico
        window.balanceChart.destroy();
    }

    window.balanceChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Ingresos', 'Egresos'],
            datasets: [{
                data: [ingresos, egresos],
                backgroundColor: ['#10B981', '#EF4444'],
                borderColor: ['#059669', '#DC2626'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Actualizar balance total
    const balance = ingresos - egresos;
    const balanceElement = document.getElementById('balanceTotal');
    balanceElement.textContent = balance.toFixed(2);
    balanceElement.className = balance >= 0 ? 'font-bold text-green-600' : 'font-bold text-red-600';
}