# Gestor de Presupuesto Personal
Un sistema de gestión de presupuesto con interfaz web que permite a los usuarios:
- Registrar ingresos y gastos
- Ver movimientos en una tabla
- Buscar y filtrar transacciones

## Cómo Usar

1. Abrir index.html en un navegador web
2. Para registrar un movimiento:
   - Ingresar nombre de la transacción
   - Seleccionar tipo (Ingreso/Egreso)
   - Ingresar monto
   - Hacer clic en "Registrar Movimiento"
3. Funciones adicionales:
   - Usar "Listar Nombres" para ver lista de movimientos
   - Usar "Egresos > 100" para filtrar gastos mayores
   - Usar la barra de búsqueda para encontrar movimientos específicos
4. Ver el resumen de totales al final de la página

## Características

- Registro de ingresos y egresos con validación de datos
- Visualización en tabla con formato diferenciado por tipo
- Búsqueda de movimientos por nombre
- Filtros especializados para egresos
- Cálculo automático de totales
- Datos de ejemplo precargados

## Funcionamiento del Programa

El programa funciona como una aplicación web interactiva que permite gestionar movimientos financieros. Cada transacción se almacena en memoria y se muestra en una tabla actualizada en tiempo real. El sistema incluye validaciones para asegurar datos correctos y proporciona feedback inmediato al usuario. Los totales de ingresos y egresos se calculan automáticamente.

## Funciones Principales

- `cargarDatosEjemplo()`: Inicializa la aplicación con datos de muestra
- `actualizarTabla()`: Actualiza la visualización de movimientos y calcula totales
- `mostrarResultadoBusqueda()`: Muestra resultados de búsqueda con formato
- `obtenerNombresMovimientos()`: Lista todos los nombres de movimientos
- `filtrarEgresosMayores()`: Filtra egresos superiores a un límite
- `buscarMovimientoPorNombre()`: Busca movimientos por coincidencia de nombre

## Estructuras de Control

El programa utiliza las siguientes estructuras fundamentales:
- Array `movimientos`: Almacena todos los movimientos financieros
- Event Listeners: Manejan la interacción del usuario con los botones y formularios
- Condicionales: Validan datos y controlan el flujo de la aplicación
- Funciones Map/Filter: Procesan y filtran datos de movimientos
- DOM Manipulation: Actualiza la interfaz de usuario dinámicamente