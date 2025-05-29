# DevLama (formerly JSLama)

AI-powered development assistant that leverages Ollama's language models for code generation and assistance.

[![npm version](https://img.shields.io/npm/v/devlama.svg)](https://www.npmjs.com/package/devlama)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

## PyLama Ecosystem Navigation

| Project | Description | Links |
|---------|-------------|-------|
| **DevLama** | AI-powered development assistant | [GitHub](https://github.com/py-lama/devlama) · [NPM](https://www.npmjs.com/package/devlama) · [Docs](https://py-lama.github.io/devlama/) |
| **GetLLM** | LLM model management and code generation | [GitHub](https://github.com/py-lama/getllm) · [PyPI](https://pypi.org/project/getllm/) · [Docs](https://py-lama.github.io/getllm/) |
| **LogLama** | Centralized logging and environment management | [GitHub](https://github.com/py-lama/loglama) · [PyPI](https://pypi.org/project/loglama/) · [Docs](https://py-lama.github.io/loglama/) |
| **APILama** | API service for code generation | [GitHub](https://github.com/py-lama/apilama) · [Docs](https://py-lama.github.io/apilama/) |
| **BEXY** | Sandbox for executing generated code | [GitHub](https://github.com/py-lama/bexy) · [NPM](https://www.npmjs.com/package/bexy) · [Docs](https://py-lama.github.io/bexy/) |
| **JSLama** | JavaScript code generation | [GitHub](https://github.com/py-lama/jslama) · [NPM](https://www.npmjs.com/package/jslama) · [Docs](https://py-lama.github.io/jslama/) |
| **SheLLama** | Shell command generation | [GitHub](https://github.com/py-lama/shellama) · [PyPI](https://pypi.org/project/shellama/) · [Docs](https://py-lama.github.io/shellama/) |
| **WebLama** | Web application generation | [GitHub](https://github.com/py-lama/weblama) · [Docs](https://py-lama.github.io/weblama/) |

## Author

**Tom Sapletta** — DevOps Engineer & Systems Architect

- 💻 15+ years in DevOps, Software Development, and Systems Architecture
- 🏢 Founder & CEO at Telemonit (Portigen - edge computing power solutions)
- 🌍 Based in Germany | Open to remote collaboration
- 📚 Passionate about edge computing, hypermodularization, and automated SDLC

[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/tom-sapletta-com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white)](https://linkedin.com/in/tom-sapletta-com)
[![ORCID](https://img.shields.io/badge/ORCID-A6CE39?logo=orcid&logoColor=white)](https://orcid.org/0009-0000-6327-2810)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=flat&logo=about.me&logoColor=white)](https://www.digitname.com/)

## Support This Project

If you find this project useful, please consider supporting it:

- [GitHub Sponsors](https://github.com/sponsors/tom-sapletta-com)
- [Open Collective](https://opencollective.com/tom-sapletta-com)
- [PayPal](https://www.paypal.me/softreck/10.00)
- [Donate via Softreck](https://donate.softreck.dev)

## Installation

```bash
npm install -g devlama  # For global CLI usage
# or
yarn global add devlama
```

## Quick Start

### Command Line Usage

```bash
# Initialize a new project
devlama init my-project

# Generate code from a prompt
devlama generate "Create a React component that displays a counter"

# Start interactive mode
devlama

# Show version
devlama --version
```

### Programmatic Usage

```javascript
const { DevLama } = require('devlama');

const devlama = new DevLama({
  model: 'codellama',  // Default model
  temperature: 0.7,
});

// Generate code from a prompt
const code = await devlama.generateCode('Create a function that sorts an array of objects by a property');
console.log(code);
```

## Features

- AI-powered code generation and assistance
- Support for multiple programming languages
- Integration with Ollama's language models
- Interactive REPL for development
- Configurable model parameters
- Project scaffolding and management
JSLama.generate(prompt).then(code => {
  console.log(code);
});
```

## Testing

To run tests for JSLama using the PyLama ecosystem:

```bash
cd ../../tests
./run_all_tests.sh
# or for a tolerant run
./run_all_tests_tolerant.sh
```

Or, from the jslama directory:

```bash
make test
```

## Project Management

Common Makefile commands:

- `make install` – Install dependencies
- `make lint` – Lint code
- `make test` – Run tests
- `make build` – Build project
- `make clean` – Clean build/deps
- `make format` – Format code
- `make start` – Start project (if supported)

## Example: Code Generation with JSLama

```js
const JSLama = require('jslama');

JSLama.generate('Write a function to reverse a string.').then(code => {
  console.log(code);
  // Output: function reverseString(str) { return str.split('').reverse().join(''); }
});
```

---

JSLama is a JavaScript code generation tool that leverages Ollama's language models. It is part of the PyLama ecosystem and integrates with LogLama as the primary service for centralized logging and environment management.