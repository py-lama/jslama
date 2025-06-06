#!/usr/bin/env node

/**
 * DevLama - AI-powered development assistant
 * 
 * @module devlama
 */

const { program } = require('commander');
const chalk = require('chalk');
const { version } = require('./package.json');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

class DevLama {
  constructor(options = {}) {
    this.model = options.model || 'codellama';
    this.temperature = options.temperature || 0.7;
    this.verbose = options.verbose || false;
  }

  /**
   * Generate code based on a prompt
   * @param {string} prompt - The prompt describing the code to generate
   * @returns {Promise<string>} The generated code
   */
  async generateCode(prompt) {
    if (this.verbose) {
      console.log(chalk.blue(`[DevLama] Generating code with model: ${this.model}`));
    }
    
    // This is a placeholder for the actual implementation
    // In a real implementation, this would call the Ollama API or similar
    return `// Generated by DevLama with model: ${this.model}
// ${prompt}

// TODO: Implement the actual code generation
console.log('Hello, DevLama!');`;
  }

  /**
   * Initialize a new project
   * @param {string} projectName - Name of the project to create
   * @param {Object} options - Additional options
   */
  async init(projectName, options = {}) {
    const projectPath = path.resolve(process.cwd(), projectName);
    
    if (fs.existsSync(projectPath)) {
      throw new Error(`Directory ${projectPath} already exists`);
    }

    // Create project directory
    fs.mkdirSync(projectPath, { recursive: true });
    
    // Initialize package.json
    const packageJson = {
      name: projectName,
      version: '0.1.0',
      description: 'Project generated with DevLama',
      main: 'index.js',
      scripts: {
        start: 'node index.js',
        test: 'echo \"Error: no test specified\" && exit 1'
      },
      keywords: [],
      author: '',
      license: 'MIT'
    };

    fs.writeFileSync(
      path.join(projectPath, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    // Create a basic README
    const readmeContent = `# ${projectName}

Project generated with [DevLama](https://github.com/py-lama/devlama).

## Getting Started

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start the application:
   \`\`\`bash
   npm start
   \`\`\`
`;

    fs.writeFileSync(path.join(projectPath, 'README.md'), readmeContent);

    // Create a basic index.js
    const indexContent = `// ${projectName}
// Generated by DevLama

console.log('Hello, DevLama!');
`;

    fs.writeFileSync(path.join(projectPath, 'index.js'), indexContent);

    return {
      success: true,
      path: projectPath,
      message: `Project ${projectName} created successfully at ${projectPath}`
    };
  }
}

// CLI Implementation
async function main() {
  program
    .name('devlama')
    .description('AI-powered development assistant for code generation and assistance')
    .version(version, '-v, --version', 'output the current version')
    .option('-m, --model <model>', 'specify the model to use', 'codellama')
    .option('--temperature <number>', 'set the temperature for generation', parseFloat, 0.7)
    .option('--verbose', 'enable verbose output', false);

  // Generate command
  program
    .command('generate <prompt>')
    .description('Generate code based on a prompt')
    .action(async (prompt) => {
      try {
        const devlama = new DevLama({
          model: program.opts().model,
          temperature: program.opts().temperature,
          verbose: program.opts().verbose
        });
        
        const code = await devlama.generateCode(prompt);
        console.log('\n' + chalk.green('Generated code:') + '\n');
        console.log(code);
      } catch (error) {
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
      }
    });

  // Init command
  program
    .command('init [projectName]')
    .description('Initialize a new project')
    .action(async (projectName) => {
      try {
        if (!projectName) {
          const answers = await inquirer.prompt([
            {
              type: 'input',
              name: 'projectName',
              message: 'Project name:',
              validate: input => !!input.trim() || 'Project name is required'
            }
          ]);
          projectName = answers.projectName;
        }

        const devlama = new DevLama({
          verbose: program.opts().verbose
        });
        
        const result = await devlama.init(projectName);
        console.log(chalk.green('✓'), result.message);
      } catch (error) {
        console.error(chalk.red('Error:'), error.message);
        process.exit(1);
      }
    });

  // Interactive mode
  program
    .command('interactive')
    .description('Start interactive mode')
    .action(async () => {
      console.log(chalk.blue('\nDevLama Interactive Mode'));
      console.log(chalk.gray('Type "exit" to quit\n'));

      while (true) {
        const { action } = await inquirer.prompt([
          {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
              { name: 'Generate code', value: 'generate' },
              { name: 'Create new project', value: 'init' },
              { name: 'Exit', value: 'exit' }
            ]
          }
        ]);

        if (action === 'exit') {
          console.log(chalk.blue('\nGoodbye! 👋\n'));
          process.exit(0);
        }

        if (action === 'generate') {
          const { prompt } = await inquirer.prompt([
            {
              type: 'input',
              name: 'prompt',
              message: 'Describe the code you want to generate:',
              validate: input => !!input.trim() || 'Prompt cannot be empty'
            }
          ]);

          try {
            const devlama = new DevLama({
              model: program.opts().model,
              temperature: program.opts().temperature,
              verbose: program.opts().verbose
            });
            
            const code = await devlama.generateCode(prompt);
            console.log('\n' + chalk.green('Generated code:') + '\n');
            console.log(code + '\n');
          } catch (error) {
            console.error(chalk.red('Error:'), error.message);
          }
        }

        if (action === 'init') {
          const { projectName } = await inquirer.prompt([
            {
              type: 'input',
              name: 'projectName',
              message: 'Project name:',
              validate: input => !!input.trim() || 'Project name is required'
            }
          ]);

          try {
            const devlama = new DevLama({
              verbose: program.opts().verbose
            });
            
            const result = await devlama.init(projectName);
            console.log(chalk.green('✓'), result.message + '\n');
          } catch (error) {
            console.error(chalk.red('Error:'), error.message + '\n');
          }
        }
      }
    });

  // Default command (show help)
  program.action(() => {
    program.help();
  });

  // Parse command line arguments
  program.parse(process.argv);
}

// Export the DevLama class for programmatic use
module.exports = {
  DevLama,
  // For backward compatibility
  generateCode: async (prompt, options = {}) => {
    const devlama = new DevLama(options);
    return devlama.generateCode(prompt);
  }
};

// Run the CLI if this file is executed directly
if (require.main === module) {
  main().catch(error => {
    console.error(chalk.red('Fatal error:'), error);
    process.exit(1);
  });
}
