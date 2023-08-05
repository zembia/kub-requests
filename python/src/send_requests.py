import requests
import threading
from time import sleep
import argparse

lock = threading.Lock()


def main():
    # Parsing of script arguments
    parser = argparse.ArgumentParser(
        description="Script para verificar si respuestas de una URL son un JSON válido."
    )

    parser.add_argument(
        "-u", "--url", help="URL donde hacer las peticiones", required=True
    )
    parser.add_argument(
        "-t", "--threads", help="Cantidad de hebras a utilizar", required=True, type=int
    )
    parser.add_argument(
        "-r",
        "--requests",
        help="Cantidad de peticiones a realizar por hebra",
        required=True,
        type=int,
    )
    parser.add_argument(
        "-c",
        "--clear",
        help="Limpia el archivo de log existente (falso por defecto)",
        action="store_true",
    )
    parser.add_argument(
        "-s",
        "--session",
        help="Permite habilitar/deshabilitar la sesión entre las consultas",
        action="store_true",
    )

    args = parser.parse_args()

    url = args.url
    n_threads = args.threads
    n_requests = args.requests
    clear = args.clear
    with_session = args.session

    # Create log file
    log_filename = "results.log"
    if clear:
        with open(log_filename, "w") as file:
            pass

    # Start multiple threads
    threads = []
    for thread_id in range(n_threads):
        threads.append(
            threading.Thread(
                target=request_thread,
                args=(url, n_requests, thread_id, log_filename, with_session),
            )
        )
        threads[thread_id].start()

    # Wait until the threads are done
    while threading.activeCount() > 1:
        sleep(1)

    exit()


def request_thread(url, n_requests, thread_id, log_filename, with_session):
    if with_session:
        s = requests.Session()
    else:
        s = requests

    error_log = []
    for req_index in range(n_requests):
        res = s.get(url)
        try:
            res.json()
        except:
            error_log.append(res.text)

        sleep(0.01)

    print(f"Errors thread:{thread_id}/requests:{len(error_log)}")

    if len(error_log) == 0:
        return

    # Write data in log file
    lock.acquire()
    with open(log_filename, "a") as file:
        file.write(f"Errors thread:{thread_id}/requests:{len(error_log)}\n")
        for i, error in enumerate(error_log):
            file.write(f"Error ID {i}:\n'")
            file.write(error)
            file.write("'\n")
    lock.release()


if __name__ == "__main__":
    main()
