#!/usr/bin/env node

// Simple script to start the frontend Vite development server
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🚀 Starting Vite development server...');
console.log(`📁 Working directory: ${__dirname}`);

// Start Vite development server from root directory with config
const viteProcess = spawn('npx', ['vite', 'dev', '--config', 'vite.dev.config.ts'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

viteProcess.on('error', (error) => {
  console.error('❌ Error starting Vite:', error);
  process.exit(1);
});

viteProcess.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`);
  process.exit(code);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down...');
  viteProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down...');
  viteProcess.kill('SIGTERM');
});