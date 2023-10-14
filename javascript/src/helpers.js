import { InvalidArgumentError } from 'commander';

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function checkThreadsQty(nThreadsRaw) {
  const nThreads = parseInt(nThreadsRaw);
  if (isNaN(nThreads)) {
    throw new InvalidArgumentError('No es un número válido');
  }
  if (nThreads > 1) {
    throw new InvalidArgumentError('Este script solo soporta 1 hebra');
  }
  if (nThreads < 1) {
    throw new InvalidArgumentError('Cantidad de hebras inválida.');
  }

  return nThreads;
}

export function checkRequestsQty(nRequestsRaw) {
  const nRequests = parseInt(nRequestsRaw);
  if (isNaN(nRequests)) {
    throw new InvalidArgumentError('No es un número válido');
  }
  if (nRequests < 1) {
    throw new InvalidArgumentError('Cantidad de peticiones inválida.');
  }

  return nRequests;
}
