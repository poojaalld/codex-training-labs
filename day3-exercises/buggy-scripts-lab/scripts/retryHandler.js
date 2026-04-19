#!/usr/bin/env node

const requestedRetries = Number(process.argv[2] ?? 3);
const maxRetries = Number.isInteger(requestedRetries) && requestedRetries >= 0
  ? requestedRetries
  : 0;

const windows = Array.from({ length: maxRetries }, () => 1000);
console.log("Retry windows:", windows);
