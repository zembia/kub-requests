import { Command } from 'commander';
import fs from 'fs';
import { sleep, checkRequestsQty, checkThreadsQty } from './helpers.js';

const program = new Command();

let doneCounter = 0;
const errorLog = [];

async function main() {
  // Parsing script arguments
  program
    .name('kub-requests')
    .description(
      'Script para verificar si respuestas de una URL son un JSON válido.'
    );

  program.requiredOption('-u, --url <URL>', 'URL donde hacer las peticiones');
  program.requiredOption(
    '-t, --threads <THREADS>',
    'Cantidad de hebras a utilizar',
    checkThreadsQty
  );
  program.requiredOption(
    '-r, --requests <REQUESTS>',
    'Cantidad de peticiones a realizar por cada hebra',
    checkRequestsQty
  );
  program.option(
    '-c, --clear',
    'Limpia el archivo de log existente (falso por defecto)'
  );

  program.parse();
  const options = program.opts();

  const url = options.url;
  const nThreads = options.threads;
  const nRequests = options.requests;
  const clear = options.clear ?? false;

  // Clear log file
  const logFilename = 'results.log';
  if (clear === true) {
    fs.writeFileSync(logFilename, '');
  }

  // Start single process thread
  requestsLoop(url, nRequests);

  // Wait until it's done
  while (1) {
    if (doneCounter === nRequests) {
      break;
    }
    await sleep(500);
  }

  // Write results in console/file if there was any errors
  if (errorLog.length > 0) {
    const heading = `Errors thread:0/requests:${errorLog.length}\n`;
    fs.appendFileSync(logFilename, heading);
    for (const error of errorLog) {
      fs.appendFileSync(
        logFilename,
        `Error ID ${error.requestId}:\n'${error.value}'\n`
      );
    }
    console.log(heading);
  }
}

// Do loop for requests
function requestsLoop(url, nRequests) {
  for (let requestId = 0; requestId < nRequests; requestId++) {
    request(url, requestId);
  }
}

// Do the request
async function request(url, requestId) {
  let rawText;
  let status;
  try {
    const res = await fetch(url);
    status = res.status;
    rawText = await res.text();
    JSON.parse(rawText);
  } catch (e) {
    if (status === 200) {
      errorLog.push({ value: rawText, requestId });
    }
  }
  doneCounter++;
}

main();
