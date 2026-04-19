const userPayload = process.argv[2];
let user;

if (userPayload) {
  try {
    user = JSON.parse(userPayload);
  } catch (error) {
    console.error("Invalid user JSON.");
  }
}

function describeAccess(u) {
  if (!u) {
    return "NO USER PROVIDED";
  }

  if (!Array.isArray(u.roles) || u.roles.length === 0) {
    return "NO ROLES ASSIGNED";
  }

  return u.roles.map((role) => String(role).toUpperCase()).join(", ");
}

console.log("User access:", describeAccess(user));
