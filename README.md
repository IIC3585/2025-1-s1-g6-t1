# 2025-1-s1-g6-t1  
# Operaciones con CSV en JavaScript

## Objetivo
El objetivo de este proyecto es implementar una solución funcional en JavaScript para manipular archivos CSV. La solución demuestra diversas operaciones sobre datos CSV, como lectura, inserción, intercambio, transposición y eliminación de filas o columnas. Además, la implementación busca incorporar conceptos de programación funcional. Todas las funciones creadas están dentro del archivo **services.js**, pero para correr la tarea se debe realizar desde el archivo **main.js**.

## Requisitos Previos
Asegurarse de tener Node.js instalado en tu sistema. También se necesita instalar **@fast-csv/parse** para el procesamiento de archivos CSV.

### Ejecución del Script
Se debe guardar el archivo CSV como **data.csv** en el mismo directorio que el script. Luego, se ejecuta el script con:  
`node script.js`

## Funciones y Características

### Lectura de CSV
- **readCSV(file):** Lee el archivo CSV y devuelve su contenido como un array de filas  
- **printCSVData(file):** Lee y muestra los datos del archivo CSV en la consola

### Transformación de Datos
- **rowstocolumns(file):** Transpone los datos del CSV, convirtiendo filas en columnas  
- **columnstorows(file):** Transpone las columnas nuevamente en filas (misma lógica que la función anterior)

### Inserción de Datos
- **insertrow(file, n, row):** Inserta una nueva fila en el índice *n*  
- **insertcolumn(file, n, column):** Inserta una nueva columna en el índice *n*

### Intercambio de Datos
- **swap(file, n, m):** Intercambia la columna *n* con la columna *m* en todas las filas

### Eliminación de Datos
- **rowdelete(file, n):** Elimina la fila en el índice *n*  
- **columndelete(file, n):** Elimina la columna en el índice *n* de todas las filas

### Tabla HTML
- **tohtmltable(file):** Genera una versión del archivo CSV como una tabla HTML

## Elementos Destacados en el Código

El código implementa diversos conceptos y técnicas avanzadas de JavaScript y programación funcional:

- **Iterators y Generators:**  
  Se utiliza un *async generator* en la función `readCSVGenerator` para iterar sobre las filas del CSV de forma asíncrona mediante un bucle `for await…of`.

- **Uso de la librería Lodash:**  
  Se hace uso de la librería `lodash/fp` para aplicar métodos de programación funcional, tales como `_.curry`, `_.map`, `_.zip`, `_.flow` y `_.remove`.

- **Currying y partial evaluation:**  
  La función `logResult` se define utilizando `_.curry`, lo que permite fijar el mensaje y posteriormente aplicar los datos correspondientes, facilitando la reutilización y composición de funciones.

- **Composición y Pipes:**  
  En la función `tohtmltable` se emplea `_.flow` para encadenar funciones que transforman las filas del CSV en una cadena HTML, demostrando un claro ejemplo de composición de funciones al estilo pipe.

- **Chaining:**  
  Aunque no se utiliza el encadenamiento (*chaining*) de métodos de manera explícita, el código opta por la composición funcional mediante `_.flow`, lo que permite construir procesos de transformación de datos de forma clara y modular.

Esta integración de conceptos hace que el código sea modular, reutilizable y fácil de mantener, aprovechando las ventajas de la programación funcional en JavaScript.
