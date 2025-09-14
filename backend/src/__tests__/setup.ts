// Test setup without requiring actual database connection
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.MONGODB_URI = 'mongodb://test:test@localhost:27017/test';

// Mock console methods for cleaner test output
global.console = {
  ...console,
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Dummy test to prevent Jest from complaining about empty test suite
test('Setup file loaded', () => {
  expect(process.env.NODE_ENV).toBe('test');
});