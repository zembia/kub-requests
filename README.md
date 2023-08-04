# Scripts de prueba

Repositorio contiene scripts que permiten realizar múltiples peticiones GET en paralelo a un servidor, y validan si es que estas peticiones entregan una respuesta correcta en formato JSON. Los resultados que tienen problemas en la petición, registran el fallo en el archivo `results.log`.

# Python

## Requerimientos

- Requests==2.31.0
- Python >= 3.7.9\*

\*:Es posible que sea compatible con otras versiones de python 3, aunque esto no fue verificado

## Ejecución

```
python python/src/getting_payroll -u [URL] -t [N_THREADS] -r [N_REQUESTS] -c -s
```

- `-u`: Dirección HTTP o HTTPs sobre la cual se quieren hacer las peticiones GET.
- `-t`: Cantidad de hebras que se quiere utilizar para realizar peticiones.
- `-r`: Cantidad de peticiones que se quiere realizar con cada hebra.
- `-c`: Limpia el registro de errores. En caso contrario, se sigue agregando errores al archivo existente.
- `-s`: Mantiene una sesión activa por cada hebra, permitiendo la utilización de cookies en las peticiones.
