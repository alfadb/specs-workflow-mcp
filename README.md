# Spec Workflow MCP

[![npm version](https://img.shields.io/npm/v/spec-workflow-mcp.svg)](https://www.npmjs.com/package/spec-workflow-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP](https://img.shields.io/badge/MCP-Compatible-blue)](https://modelcontextprotocol.com)

[English](README.md) | [简体中文](README-zh.md)

Guide AI to systematically complete software development through a structured **Requirements → Design → Tasks** workflow, ensuring code implementation stays aligned with business needs.

## Table of Contents

- [Why Use It?](#why-use-it)
- [Quick Start](#quick-start)
- [Remote Development](#remote-development)
  - [VS Code Remote SSH](#vs-code-remote-ssh)
  - [WSL Development](#wsl-development)
- [Workflow Example](#workflow-example)
- [Document Organization](#document-organization)
- [Installation Guide](#installation-guide)
- [AI Usage Guidelines](#ai-usage-guidelines)
- [Changelog](#changelog)
- [Links](#links)
- [License](#license)

## Why Use It?

### ❌ Without Spec Workflow

- AI jumps randomly between tasks, lacking systematic approach
- Requirements disconnect from actual code implementation
- Scattered documentation, difficult to track project progress
- Missing design decision records

### ✅ With Spec Workflow

- AI completes tasks sequentially, maintaining focus and context
- Complete traceability from user stories to code implementation
- Standardized document templates with automatic progress management
- Each stage requires confirmation, ensuring correct direction
- **Persistent progress**: Continue from where you left off with `check`, even in new conversations

## Quick Start

### 1. Install (Claude Code Example)

```bash
claude mcp add spec-workflow-mcp -s user -- npx -y spec-workflow-mcp@latest
```

See [full installation guide](#installation-guide) for other clients.

### 2. Start a New Project

```
"Help me create a user authentication system using spec workflow"
```

### 3. Continue Existing Project

```
"Use spec workflow check ./my-project"
```

AI will automatically detect project status and continue from where you left off.

---

## Remote Development

This MCP server includes comprehensive support for remote development environments with automatic detection and configuration.

### Supported Environments

- **Local Development**: Standard local filesystem
- **VS Code Remote SSH**: SSH connections with automatic path resolution
- **WSL**: Windows Subsystem for Linux with Windows-Linux path conversion
- **Containers**: Docker and other containerized environments

### Quick Setup

#### Remote SSH Configuration

```bash
# 1. Connect via VS Code Remote SSH
# 2. Clone and setup
git clone https://github.com/kingkongshot/specs-workflow-mcp.git
cd specs-workflow-mcp
./scripts/setup-remote.sh
```

#### WSL Configuration

```bash
# In WSL terminal
git clone https://github.com/kingkongshot/specs-workflow-mcp.git
cd specs-workflow-mcp
./scripts/setup-remote.sh  # Auto-detects WSL
```

### Key Features

- 🔍 **Automatic Environment Detection**: Detects SSH, WSL, and container environments
- 🛤️ **Smart Path Resolution**: Handles cross-platform path conversion
- ⚙️ **VS Code Integration**: Pre-configured tasks, debugging, and extensions
- 📊 **Environment Logging**: Detailed environment information for troubleshooting

### Detailed Documentation

For complete setup guides, troubleshooting, and advanced configuration:

- 📖 [Remote SSH Development Guide](./docs/REMOTE-DEVELOPMENT.md)
- 🐧 [WSL Development Guide](./docs/WSL-DEVELOPMENT.md)
- ⚙️ [Technical Implementation Details](./docs/)

---

## Workflow Example

### 1. You Describe Requirements

```
You: "I need to build a user authentication system"
```

### 2. AI Creates Structured Documents

```
AI: "I'll help you create a spec workflow for user authentication..."

📝 requirements.md - User stories and feature requirements
🎨 design.md - Technical architecture and design decisions
✅ tasks.md - Concrete implementation task list
```

### 3. Step-by-Step Review and Implementation

After each phase completion, AI will request your confirmation before proceeding to ensure the project stays on the right track.

## Document Organization

### Basic Structure

```
my-project/specs/
├── requirements.md              # Requirements: User stories, feature specs
├── design.md                    # Design: Architecture, APIs, data models
├── tasks.md                     # Tasks: Numbered implementation steps
└── .workflow-confirmations.json # Status: Automatic progress tracking
```

### Multi-Module Projects

```
my-project/specs/
├── user-authentication/         # Authentication module
├── payment-system/             # Payment module
└── notification-service/       # Notification module
```

You can specify any directory: `"Create auth docs using spec workflow in ./src/features/auth"`

## 📦 Installation Guide

<details>
<summary>Installation Instructions</summary>

### System Requirements

- Node.js ≥ v18.0.0
- npm or yarn
- Claude Desktop or any MCP-compatible client

### Installation in Different MCP Clients

#### Claude Code (Recommended)

Use Claude CLI to add the MCP server:

```bash
claude mcp add spec-workflow-mcp -s user -- npx -y spec-workflow-mcp@latest
```

#### Claude Desktop

Add to your Claude Desktop configuration file:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%/Claude/claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "spec-workflow": {
      "command": "npx",
      "args": ["-y", "spec-workflow-mcp@latest"]
    }
  }
}
```

#### Cursor

Add to your Cursor configuration file (`~/.cursor/config.json`):

```json
{
  "mcpServers": {
    "spec-workflow": {
      "command": "npx",
      "args": ["-y", "spec-workflow-mcp@latest"]
    }
  }
}
```

#### Cline

Use Cline's MCP server management interface to add the server:

1. Open VS Code with Cline extension installed
2. Open Cline settings (gear icon)
3. Navigate to MCP Servers section
4. Add new server:
   - Command: `npx`
   - Arguments: `-y spec-workflow-mcp@latest`

#### Windsurf (Codeium)

Add to your Windsurf configuration file (`~/.codeium/windsurf/mcp_config.json`):

```json
{
  "mcpServers": {
    "spec-workflow": {
      "command": "npx",
      "args": ["-y", "spec-workflow-mcp@latest"],
      "env": {},
      "autoApprove": [],
      "disabled": false,
      "timeout": 60,
      "transportType": "stdio"
    }
  }
}
```

#### VS Code (requires MCP extension)

Add to your VS Code settings file (`settings.json`):

```json
{
  "mcp.servers": {
    "spec-workflow": {
      "command": "npx",
      "args": ["-y", "spec-workflow-mcp@latest"]
    }
  }
}
```

#### Zed

Add to your Zed configuration file (`~/.config/zed/settings.json`):

```json
{
  "assistant": {
    "version": "2",
    "mcp": {
      "servers": {
        "spec-workflow": {
          "command": "npx",
          "args": ["-y", "spec-workflow-mcp@latest"]
        }
      }
    }
  }
}
```

### Install from Source

```bash
git clone https://github.com/kingkongshot/specs-mcp.git
cd specs-mcp
npm install
npm run build
```

Then add to Claude Desktop config:

```json
{
  "mcpServers": {
    "spec-workflow": {
      "command": "node",
      "args": ["/absolute/path/to/specs-mcp/dist/index.js"]
    }
  }
}
```

</details>

## 🤖 AI Usage Guidelines

### To Help AI Use This Tool Better

**Strongly recommended** to add the following prompt to your AI assistant configuration. Without this configuration, AI might:

- ❌ Not know when to invoke Spec Workflow
- ❌ Forget to manage task progress, leading to chaotic work
- ❌ Not use Spec Workflow for systematic document management
- ❌ Unable to continuously track project status

With this configuration, AI will intelligently use Spec Workflow to manage the entire development process.

> **Configuration Note**: Please modify the following as needed:
>
> 1. Change `./specs` to your preferred document directory path
> 2. Change "English" to your preferred document language (like "Chinese")

```
# Spec Workflow Usage Guidelines

## 1. Check Project Progress
When users mention continuing previous projects or are unsure of current progress, proactively use:
specs-workflow tool with action.type="check" and path="./specs"

## 2. Document Language
All spec workflow documents should be written consistently in English, including all content in requirements, design, and task documents.

## 3. Document Directory
All spec workflow documents should be placed in the ./specs directory to maintain consistent project document organization.

## 4. Task Management
Always use the following to manage task progress:
specs-workflow tool with action.type="complete_task" and taskNumber="current task number"
Follow the workflow guidance to continue working until all tasks are completed.

## 5. Best Practices
- Proactive progress check: When user says "continue from last time", first use check to see current status
- Language consistency: Use the same language throughout all project documents
- Flexible structure: Choose single-module or multi-module organization based on project scale
- Task granularity: Each task should be completable within 1-2 hours
```

## 📋 Changelog

For detailed version history and release notes, see [CHANGELOG.md](CHANGELOG.md).

## 🔗 Links

- [GitHub Repository](https://github.com/kingkongshot/specs-mcp)
- [NPM Package](https://www.npmjs.com/package/spec-workflow-mcp)
- [Report Issues](https://github.com/kingkongshot/specs-mcp/issues)
- [Technical Documentation](./docs/README.md) - Remote development and implementation guides

## 📄 License

MIT License

---

<a href="https://glama.ai/mcp/servers/@kingkongshot/specs-workflow-mcp">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/@kingkongshot/specs-workflow-mcp/badge" alt="Spec Workflow MCP server" />
</a>
