let movements = [];

function registrarMovimiento() {
    const nombre = prompt('Nombre del movimiento:');
    if (!nombre) {
        alert('El nombre no puede estar vacío');
        return false;
    }

    const tipo = prompt('Tipo (Ingreso/Egreso):').toLowerCase();
    if (tipo !== 'ingreso' && tipo !== 'egreso') {
        alert('Tipo inválido. Debe ser Ingreso o Egreso');
        return false;
    }

    const monto = parseFloat(prompt('Monto:'));
    if (isNaN(monto) || monto <= 0) {
        alert('El monto debe ser un número mayor a cero');
        return false;
    }

    const movement = {
        nombre,
        tipo,
        monto: tipo === 'egreso' ? -monto : monto
    };

    movements.push(movement);
    return true;
}

function calcularTotalSaldo() {
    return movements.reduce((total, mov) => total + mov.monto, 0);
}

function eliminarMovimiento() {
    const nombreBorrar = prompt('Ingrese el nombre del movimiento a eliminar:');
    const indice = movements.findIndex(mov => mov.nombre.toLowerCase() === nombreBorrar.toLowerCase());
    
    if (indice === -1) {
        alert('No se encontró el movimiento');
        return;
    }
    
    movements.splice(indice, 1);
    alert('Movimiento eliminado con éxito');
    mostrarResumen();
}

function mostrarMaximos() {
    const ingresos = movements.filter(mov => mov.monto > 0);
    const egresos = movements.filter(mov => mov.monto < 0);
    
    const maxIngreso = ingresos.length > 0 ? Math.max(...ingresos.map(mov => mov.monto)): 0;
    
    const maxEgreso = egresos.length > 0 ? Math.abs(Math.min(...egresos.map(mov => mov.monto))): 0;

    console.log('\nMontos Máximos');
    console.log('-----------------------');
    console.log(`Ingreso más alto: $${maxIngreso.toFixed(2)}`);
    console.log(`Egreso más alto: $${maxEgreso.toFixed(2)}`);
}

function mostrarResumen() {
    const totalIngresos = movements
        .filter(mov => mov.monto > 0)
        .reduce((total, mov) => total + mov.monto, 0);
    
    const totalEgresos = Math.abs(movements
        .filter(mov => mov.monto < 0)
        .reduce((total, mov) => total + mov.monto, 0));

    console.log('\nResumen Final');
    console.log('-----------------------');
    console.log(`Total de movimientos registrados: ${movements.length}`);
    console.log(`Saldo total: $${calcularTotalSaldo().toFixed(2)}`);
    console.log('\nDesglose por tipo:');
    console.log(`- Egresos: $${totalEgresos.toFixed(2)}`);
    console.log(`- Ingresos: $${totalIngresos.toFixed(2)}`);
    
    mostrarMaximos();
}

function iniciarPrograma() {
    while (true) {
        if (registrarMovimiento()) {
            const continuar = prompt('¿Registrar otro movimiento? (si/no):').toLowerCase();
            if (continuar !== 'si') break;
        }
    }
    mostrarResumen();
}

iniciarPrograma();