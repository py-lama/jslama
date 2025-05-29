const { DevLama } = require('../index');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

describe('DevLama Class', () => {
  let devlama;

  beforeEach(() => {
    devlama = new DevLama({
      verbose: false
    });
  });

  describe('generateCode', () => {
    it('should generate code from a prompt', async () => {
      const prompt = 'Create a function that adds two numbers';
      const result = await devlama.generateCode(prompt);
      
      expect(typeof result).toBe('string');
      expect(result).toContain('function');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle empty prompt', async () => {
      await expect(devlama.generateCode('')).rejects.toThrow();
    });
  });

  describe('init', () => {
    const testProjectName = 'test-project-temp';
    const testProjectPath = path.join(process.cwd(), testProjectName);

    afterEach(() => {
      // Clean up test project
      if (fs.existsSync(testProjectPath)) {
        fs.rmSync(testProjectPath, { recursive: true, force: true });
      }
    });

    it('should create a new project with all required files', async () => {
      const result = await devlama.init(testProjectName);
      
      expect(result.success).toBe(true);
      expect(fs.existsSync(testProjectPath)).toBe(true);
      expect(fs.existsSync(path.join(testProjectPath, 'package.json'))).toBe(true);
      expect(fs.existsSync(path.join(testProjectPath, 'README.md'))).toBe(true);
      expect(fs.existsSync(path.join(testProjectPath, 'index.js'))).toBe(true);
    });

    it('should not overwrite existing directory', async () => {
      // Create the directory first
      fs.mkdirSync(testProjectPath);
      
      await expect(devlama.init(testProjectName)).rejects.toThrow();
    });
  });
});

describe('CLI', () => {
  const cliPath = path.join(__dirname, '..', 'bin', 'devlama-cli.js');

  it('should show version with --version flag', () => {
    const result = spawnSync('node', [cliPath, '--version']);
    const output = result.stdout.toString().trim();
    expect(output).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('should show help with --help flag', () => {
    const result = spawnSync('node', [cliPath, '--help']);
    const output = result.stdout.toString();
    expect(output).toContain('Usage:');
    expect(output).toContain('Commands:');
  });
});

describe('Integration', () => {
  it('should be able to import the package', () => {
    const pkg = require('..');
    expect(pkg).toHaveProperty('DevLama');
    expect(pkg).toHaveProperty('generateCode');
    expect(typeof pkg.generateCode).toBe('function');
  });
});
