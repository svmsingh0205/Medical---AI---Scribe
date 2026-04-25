# Contributing to Medical Scribe Agent

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Respect privacy and HIPAA compliance requirements
- Never commit PHI (Protected Health Information) or real patient data

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/medical-scribe-agent.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m "Add: your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Open a Pull Request

## Development Guidelines

### Python (Backend)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions and classes
- Add unit tests for new features
- Run `black` for formatting
- Run `flake8` for linting

### TypeScript/React (Frontend)
- Follow ESLint configuration
- Use TypeScript for type safety
- Write meaningful component names
- Add comments for complex logic
- Test UI components

### Commit Messages
- Use clear, descriptive messages
- Format: `Type: Description`
- Types: Add, Fix, Update, Remove, Refactor, Docs, Test

Examples:
- `Add: SOAP note generation service`
- `Fix: Transcription accuracy for medical terms`
- `Update: README with installation instructions`

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Include both unit and integration tests where applicable

## Security & Compliance

- Never commit API keys or secrets
- Use environment variables for sensitive data
- Follow HIPAA compliance guidelines
- Encrypt PHI data
- Add security considerations in PR description

## Pull Request Process

1. Update README.md if needed
2. Update documentation
3. Ensure CI/CD passes
4. Request review from maintainers
5. Address review feedback
6. Squash commits if requested

## Questions?

Open an issue or reach out to the maintainers.

Thank you for contributing! 🙏
