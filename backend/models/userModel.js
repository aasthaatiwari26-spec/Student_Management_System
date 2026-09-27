import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, "../data/users.json");

// Helper to ensure data file exists
function ensureFileExists() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
  }
}

// Read all users from JSON file
export function getAllUsers() {
  ensureFileExists();
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
}

// Save all users to JSON file
export function saveAllUsers(users) {
  ensureFileExists();
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2), "utf-8");
}

// Find user by email (case-insensitive)
export function findByEmail(email) {
  if (!email) return null;
  const users = getAllUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

// Find user by ID
export function findById(id) {
  if (!id) return null;
  const users = getAllUsers();
  return users.find((u) => u.id === id) || null;
}

// Create and save a new user
export function createUser(userData) {
  const users = getAllUsers();
  const newUser = {
    id: `USER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    ...userData,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveAllUsers(users);
  return newUser;
}

// Update user profile
export function updateUser(id, updateData) {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = {
    ...users[index],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  saveAllUsers(users);
  return users[index];
}
