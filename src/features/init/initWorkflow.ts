/**
 * Initialize workflow functionality
 */

import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import {
  getWorkflowStatus,
  getCurrentStage,
} from "../shared/documentStatus.js";
import { calculateWorkflowProgress } from "../shared/progressCalculator.js";
import { createRequirementsDocument } from "./createRequirementsDoc.js";
import { updateStageConfirmation } from "../shared/confirmationStatus.js";
import { responseBuilder } from "../shared/responseBuilder.js";
import { WorkflowResult } from "../shared/mcpTypes.js";

export interface InitOptions {
  path: string;
  featureName: string;
  introduction: string;
  onProgress?: (
    progress: number,
    total: number,
    message: string
  ) => Promise<void>;
}

export async function initWorkflow(
  options: InitOptions
): Promise<WorkflowResult> {
  const { path, featureName, introduction, onProgress } = options;

  // Create feature-specific directory path first
  const featurePath = join(path, featureName);

  try {
    await reportProgress(onProgress, 0, 100, "Starting initialization...");

    // Create base directory
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }

    // Create feature-specific directory
    if (!existsSync(featurePath)) {
      mkdirSync(featurePath, { recursive: true });
    }

    // Use feature path for all subsequent operations
    const workingPath = featurePath;

    await reportProgress(onProgress, 50, 100, "Checking project status...");

    // Comprehensively check if project already exists
    const requirementsPath = join(workingPath, "requirements.md");
    const designPath = join(workingPath, "design.md");
    const tasksPath = join(workingPath, "tasks.md");
    const confirmationsPath = join(workingPath, ".workflow-confirmations.json");

    // If any workflow-related files exist, consider the project already exists
    const projectExists =
      existsSync(requirementsPath) ||
      existsSync(designPath) ||
      existsSync(tasksPath) ||
      existsSync(confirmationsPath);

    if (projectExists) {
      await reportProgress(onProgress, 100, 100, "Found existing project");

      const status = getWorkflowStatus(workingPath);
      const currentStage = getCurrentStage(status, workingPath);
      const progress = calculateWorkflowProgress(workingPath, status);

      // Build detailed existing reason
      const existingFiles = [];
      if (existsSync(requirementsPath))
        existingFiles.push("Requirements document");
      if (existsSync(designPath)) existingFiles.push("Design document");
      if (existsSync(tasksPath)) existingFiles.push("Task list");
      if (existsSync(confirmationsPath)) existingFiles.push("Workflow status");

      // Use responseBuilder to build error response
      return {
        displayText: responseBuilder.buildErrorResponse("alreadyInitialized", {
          path: workingPath,
          existingFiles: existingFiles.join(", "),
        }),
        data: {
          success: false,
          error: "PROJECT_ALREADY_EXISTS",
          existingFiles: existingFiles,
          currentStage: currentStage,
          progress: progress,
        },
      };
    }

    // Generate requirements document
    const result = createRequirementsDocument(
      workingPath,
      featureName,
      introduction
    );

    if (!result.generated) {
      return {
        displayText: responseBuilder.buildErrorResponse("invalidPath", {
          path: workingPath,
        }),
        data: {
          success: false,
          error: "Failed to create requirements document",
          details: result,
        },
      };
    }

    // Initialize status file, mark requirements stage as unconfirmed
    updateStageConfirmation(workingPath, "requirements", false);
    updateStageConfirmation(workingPath, "design", false);
    updateStageConfirmation(workingPath, "tasks", false);

    await reportProgress(onProgress, 100, 100, "Initialization completed!");

    // Use responseBuilder to build success response
    return responseBuilder.buildInitResponse(workingPath, featureName);
  } catch (error) {
    return {
      displayText: responseBuilder.buildErrorResponse("invalidPath", {
        path: featurePath,
        error: String(error),
      }),
      data: {
        success: false,
        error: `Initialization failed: ${error}`,
      },
    };
  }
}

async function reportProgress(
  onProgress:
    | ((progress: number, total: number, message: string) => Promise<void>)
    | undefined,
  progress: number,
  total: number,
  message: string
): Promise<void> {
  if (onProgress) {
    await onProgress(progress, total, message);
  }
}
