// Mock for Ollama API responses
module.exports = {
  generate: async (prompt) => {
    // Simple mock response based on prompt
    if (prompt.includes('add two numbers')) {
      return 'function add(a, b) {\n  return a + b;\n}';
    }
    return `// Generated code for: ${prompt}`;
  }
};

// Mock for file system operations
const mockFs = {
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
  readFileSync: jest.fn()
};

module.exports.mockFs = mockFs;
