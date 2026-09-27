import { spawn, execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.dirname(__filename);

// Helper to kill any lingering processes on ports 5000 and 5173
function freePorts() {
  if (process.platform === "win32") {
    try {
      execSync(
        `powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 5000, 5173, 5174 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"`,
        { stdio: "ignore" }
      );
    } catch {
      // Ports already free
    }
  }
}

freePorts();

console.log("========================================================");
console.log(" 🚀 Starting Student Management System (MERN Stack)");
console.log("    Backend:  http://127.0.0.1:5000");
console.log("    Frontend: http://localhost:5173");
console.log("========================================================\n");

// 1. Start Backend Server
const backendScript = path.join(rootDir, "backend/server.js");
const backendProcess = spawn(process.execPath, [backendScript], {
  cwd: rootDir,
  env: { ...process.env, PORT: process.env.PORT || "5000" },
  stdio: "inherit",
});

// 2. Start Frontend Vite Dev Server
const frontendDir = path.join(rootDir, "Student management");
const viteCli = path.join(frontendDir, "node_modules/vite/bin/vite.js");

const frontendProcess = spawn(process.execPath, [viteCli], {
  cwd: frontendDir,
  stdio: "inherit",
});

let isShuttingDown = false;
function cleanup() {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log("\n🛑 Stopping Student Management System servers...");

  try {
    if (backendProcess.pid) {
      if (process.platform === "win32") {
        execSync(`taskkill /pid ${backendProcess.pid} /T /F`, { stdio: "ignore" });
      } else {
        backendProcess.kill("SIGTERM");
      }
    }
  } catch {}

  try {
    if (frontendProcess.pid) {
      if (process.platform === "win32") {
        execSync(`taskkill /pid ${frontendProcess.pid} /T /F`, { stdio: "ignore" });
      } else {
        frontendProcess.kill("SIGTERM");
      }
    }
  } catch {}

  process.exit();
}

process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("exit", cleanup);

backendProcess.on("exit", (code) => {
  if (code && code !== 0 && !isShuttingDown) {
    console.error(`[BACKEND] exited with code ${code}`);
  }
});

frontendProcess.on("exit", (code) => {
  if (code && code !== 0 && !isShuttingDown) {
    console.error(`[FRONTEND] exited with code ${code}`);
  }
});
