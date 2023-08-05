# Scripts de prueba

Repositorio contiene scripts que permiten realizar múltiples peticiones GET en paralelo a un servidor, y validan si es que estas peticiones entregan una respuesta correcta en formato JSON. Los resultados que tienen problemas en la petición, registran el fallo en el archivo `results.log`.

# Python

## Requerimientos

- Requests==2.31.0
- Python >= 3.7.9\*

\*:Es posible que sea compatible con otras versiones de python 3, aunque esto no fue verificado

## Ejecución

```
python python/src/send_requests.py -u <URL> -t <THREADS> -r <N_REQUESTS> [-c] [-s]
```

### Argumentos requeridos

- `-u, --url <URL>`: Dirección HTTP o HTTPs sobre la cual se quieren hacer las peticiones GET.
- `-t, --threads <THREADS>`: Cantidad de hebras que se quiere utilizar para realizar peticiones.
- `-r, --requests <REQUESTS>`: Cantidad de peticiones que se quiere realizar con cada hebra.

### Argumnetos opcionales

- `-c, --clear`: Limpia el registro de errores. En caso contrario, se sigue agregando errores al archivo existente.
- `-s, --session`: Mantiene una sesión activa por cada hebra, permitiendo la utilización de cookies en las peticiones.

# Javascript

## Requerimientos

- commander@11.0.0
- node >= 18.2.0\*

\*:Es posible que sea compatible con otras versiones de node más recientes, aunque esto no fue verificado

## Ejecución

```
node javascript/src/send_requests.js -u <URL> -t <THREADS> -r <N_REQUESTS> [-c]
```

### Argumentos requeridos

- `-u, --url <URL>`: Dirección HTTP o HTTPs sobre la cual se quieren hacer las peticiones GET.
- `-t, --threads <THREADS>`: Cantidad de hebras que se quiere utilizar para realizar peticiones.\*
- `-r, --requests <REQUESTS>`: Cantidad de peticiones que se quiere realizar con cada hebra.

\*: Para mantener la coherencia entre las llamadas del script python y javacsript se dejó el parámetro de threads, no obstante acá solo se ejecuta el proceso principal en una sola hebra, y las peticiones se resuelven de forma asíncrona.

### Argumnetos opcionales

- `-c, --clear`: Limpia el registro de errores. En caso contrario, se sigue agregando errores al archivo existente.
