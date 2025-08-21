# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.9] - 2025-08-21

### Fixed

- Fixed init workflow to create feature-specific subdirectories instead of placing files directly in the target directory
- Enhanced directory creation with proper feature name-based folder structure
- Improved project organization by isolating features in dedicated subdirectories

### Changed

- Initialization now creates a subdirectory named after the `featureName` parameter
- All workflow files (requirements.md, .workflow-confirmations.json, etc.) are now created within the feature subdirectory
- Better workspace initialization for improved project isolation

## [1.0.8] - 2025-08-20

### Added

- Full VS Code Remote SSH compatibility with automatic environment detection and path resolution
- Complete WSL (Windows Subsystem for Linux) integration
- Windows-Linux path conversion and environment detection
- Remote development environment support

### Enhanced

- Automatic detection of remote development environments
- Path resolution for cross-platform compatibility
- Enhanced logging for remote development scenarios

## [1.0.7] - 2025-08-19

### Improved

- Enhanced reliability for most models to manage tasks with spec workflow
- Better task management and workflow stability
- Improved model compatibility across different AI systems

## [1.0.6] - 2025-08-18

### Added

- Batch task completion: Complete multiple tasks at once for faster progress on large projects
- Enhanced task management capabilities
- Improved workflow efficiency for complex projects

## [1.0.5] - 2025-08-17

### Fixed

- Edge case fixes: Distinguish between "task not found" and "task already completed" to prevent workflow interruption
- Better error handling and workflow state management
- Improved robustness in task completion tracking

## [1.0.4] - 2025-08-16

### Added

- Task management: Added task completion tracking for systematic project progression
- Task completion status and progress tracking
- Enhanced workflow state management

## [1.0.3] - 2025-08-15

### Added

- Initial release: Core workflow framework for Requirements → Design → Tasks
- Basic spec workflow functionality
- Document template system
- Progress tracking and stage management
