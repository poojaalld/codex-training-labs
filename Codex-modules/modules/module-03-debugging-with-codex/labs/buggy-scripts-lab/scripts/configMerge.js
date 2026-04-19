const defaults = {
  host: "api.example.com",
  retries: 3,
  timeout: 5000
};

const overridesInput = process.argv[2];
let overrides = {};

if (overridesInput) {
  try {
    overrides = JSON.parse(overridesInput);
  } catch (error) {
    console.error("Invalid overrides JSON. Using defaults instead.");
  }
}

const consolidated = { ...defaults, ...overrides };
console.log("Merged configuration:", consolidated);
