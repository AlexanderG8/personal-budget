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

## Comparación de Paradigmas: Imperativo vs Funcional

En este proyecto, he implementado una combinación de programación imperativa y funcional:

### Enfoque Imperativo
- La manipulación directa del DOM para actualizar la tabla y mostrar mensajes
- El uso de variables globales como `movimientos`, `totalIngresos` y `totalEgresos`
- La modificación de estado mediante event listeners y el manejo de formularios

### Enfoque Funcional
- Implementación de funciones puras como `obtenerNombresMovimientos`, `filtrarEgresosMayores` y `buscarMovimientoPorNombre`
- Uso de métodos funcionales como `map` y `filter` para procesar datos
- Evitar efectos secundarios en funciones de búsqueda y filtrado

La combinación de ambos paradigmas me permitió:
- Mantener código más limpio y predecible en operaciones de datos (funcional)
- Manejar efectivamente la interacción con el usuario (imperativo)
- Balancear la necesidad de estado mutable con la claridad del código

## Aplicación del Principio DRY (Don't Repeat Yourself)

He aplicado el principio DRY de las siguientes maneras:

1. Centralización de la actualización de datos:
   - La función `actualizarTabla()` maneja toda la lógica de actualización visual
   - Reutilización del mismo código para mostrar datos iniciales y actualizaciones

2. Funciones reutilizables:
   - `mostrarResultadoBusqueda()` se usa para diferentes tipos de mensajes
   - Las funciones de filtrado y búsqueda son genéricas y reutilizables

3. Validación de datos:
   - Lógica de validación centralizada en el evento submit del formulario
   - Manejo consistente de errores y mensajes de éxito

En mi humilde opinión, este enfoque ha permitido:
- Reducir la duplicación de código
- Facilitar el mantenimiento
- Mantener la consistencia en la funcionalidad

## Backlog

1. **HU4: Eliminar Movimientos**
   - Como usuario, quiero poder eliminar movimientos individuales para corregir errores de registro.

   Criterios de aceptación:
   - Cada movimiento debe tener un botón de eliminar
   - Al eliminar, debe pedir confirmación
   - Los totales deben actualizarse automáticamente
   - Debe mostrar mensaje de éxito al eliminar

2. **HU5: Editar Movimientos**
   - Como usuario, quiero poder modificar los datos de un movimiento existente para corregir información.

   Criterios de aceptación:
   - Debe permitir editar nombre y monto
   - Debe mantener las validaciones existentes
   - Debe actualizar la tabla automáticamente
   - Debe mostrar mensaje de éxito al guardar

3. **HU6: Ordenar Movimientos**
   - Como usuario, quiero poder ordenar los movimientos por monto para visualizar mejor mis finanzas.

   Criterios de aceptación:
   - Debe poder ordenar de mayor a menor
   - Debe poder ordenar de menor a mayor
   - El orden debe mantenerse al agregar nuevos movimientos
   - Debe mostrar un indicador del orden actual

4. **HU7: Limpiar Registros**
   - Como usuario, quiero poder eliminar todos los movimientos para empezar de nuevo.

   Criterios de aceptación:
   - Debe tener un botón de "Limpiar Todo"
   - Debe pedir confirmación antes de eliminar
   - Debe reiniciar los totales a cero
   - Debe mostrar mensaje de confirmación
