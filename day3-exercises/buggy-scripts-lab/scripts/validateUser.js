#!/usr/bin/env node

const userPayload = process.argv[2];

function parseUser(rawValue) {
  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.warn(`Invalid user JSON provided. (${error.message})`);
    return null;
  }
}

const user = parseUser(userPayload);

function describeAccess(candidate) {
  if (!candidate || !Array.isArray(candidate.roles) || candidate.roles.length === 0) {
    return "No roles assigned";
  }

  return candidate.roles.map((role) => String(role).toUpperCase()).join(", ");
}

console.log("User access:", describeAccess(user));
