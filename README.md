# Gestor de Presupuesto Personal

Un sistema simple de gestión de presupuesto basado en consola que permite a los usuarios:
- Registrar ingresos y gastos
- Ver balance total
- Ver resumen por tipo de transacción

## Cómo Usar

1. Abrir index.html en un navegador web
2. Abrir la consola del navegador (F12)
3. Seguir las instrucciones para:
   - Ingresar nombre de la transacción
   - Seleccionar tipo (Ingreso/Gasto)
   - Ingresar monto
4. Ver el resumen al finalizar

## Características

- Registro de ingresos y gastos
- Validación de datos
- Cálculo de balance total
- Resumen por tipo de transacción

## Funcionamiento del Programa

El programa opera en un ciclo continuo que permite al usuario registrar múltiples movimientos financieros. Cada movimiento se almacena en un arreglo y se actualiza el balance general automáticamente. El programa valida cada entrada para asegurar la integridad de los datos y finaliza cuando el usuario lo indica.

## Funciones Principales

- `registrarMovimiento()`: Captura y valida los datos de cada transacción (nombre, tipo y monto).
- `calcularTotalSaldo()`: Calcula el balance general sumando ingresos y restando gastos.
- `mostrarResumen()`: Genera un reporte detallado con el total de movimientos y balances por tipo.
- `iniciarPrograma()`: Controla el flujo principal y la interacción con el usuario.

## Estructuras de Control

El programa utiliza estructuras de control fundamentales que mejoran su funcionamiento:
- Bucle `while`: Permite el registro continuo de movimientos hasta que el usuario decida terminar.
- Condicionales `if/else`: Garantizan la validación de datos y el manejo correcto de los tipos de movimientos.
- Array de objetos: Facilita el almacenamiento y procesamiento de los movimientos financieros.