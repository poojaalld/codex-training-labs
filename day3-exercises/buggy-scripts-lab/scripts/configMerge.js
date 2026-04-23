#!/usr/bin/env node

const defaults = {
  host: "api.example.com",
  retries: 3,
  timeout: 5000,
};

const overridesArg = process.argv[2];

function parseOverrides(rawValue) {
  if (!rawValue) {
    return {};
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.warn(`Invalid overrides JSON provided. Using defaults. (${error.message})`);
    return {};
  }
}

const overrides = parseOverrides(overridesArg);

const consolidated = { ...defaults, ...overrides };
console.log("Merged configuration:", consolidated);
