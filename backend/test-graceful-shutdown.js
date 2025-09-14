// Test script to verify graceful shutdown
// This script will start the server and then send a SIGINT signal after 5 seconds

const { spawn } = require('child_process');

console.log('Starting server for graceful shutdown test...');

const server = spawn('node', ['server.js'], {
  stdio: 'inherit'
});

// Send SIGINT after 5 seconds
setTimeout(() => {
  console.log('\n\nSending SIGINT signal to test graceful shutdown...');
  server.kill('SIGINT');
}, 5000);

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  console.log('Graceful shutdown test completed');
});