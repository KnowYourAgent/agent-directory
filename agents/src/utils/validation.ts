// src/utils/validation.ts
import { Agent } from '../types/Agent';
import { MetricData } from '../types/Metric';
import * as fs from 'fs';
import * as path from 'path';

export const validateAgent = (data: any): data is Agent => {
  try {
    const agent = data as Agent;

    if (!agent) return false;

    if (!agent.id || typeof agent.id !== 'string') return false;
    if (!agent.name || typeof agent.name !== 'string') return false;
    if (!agent.category || typeof agent.category !== 'string' || !['autonomous', 'analytics', 'marketing'].includes(agent.category)) return false;
    if (!agent.type || typeof agent.type !== 'string') return false;
    if (!agent.description || typeof agent.description !== 'string') return false;
    if (!agent.creator || typeof agent.creator !== 'string') return false;
    if (!agent.created_at || typeof agent.created_at !== 'string') return false; //  ISO string check can be added.
    if (!agent.capabilities || !Array.isArray(agent.capabilities)) return false;
    
    // optional tags check
      if (agent.tags && !Array.isArray(agent.tags)) return false;

    // Optional execution stats check
    if (agent.execution_stats) {
      if (typeof agent.execution_stats.tasks_completed !== 'number') return false;
      if (typeof agent.execution_stats.avg_rating !== 'number') return false;
      if (typeof agent.execution_stats.review_count !== 'number') return false;
    }

    // Check if custom props exist, but they can be any, therefore skipping type check.

    return true;
  } catch (error) {
    console.error('Validation Error:', error);
    return false;
  }
};

export const validateMetric = (data: any): data is MetricData => {
  try {
    const metric = data as MetricData;

    if (!metric) return false;

    if (!metric.date || typeof metric.date !== 'string') {
      return false;
    }
    if (!metric.agentId || typeof metric.agentId !== 'string') {
      return false;
    }
    if (typeof metric.tasks_completed !== 'number') {
      return false;
    }
    if (typeof metric.avg_rating !== 'number') {
      return false;
    }
    if (typeof metric.review_count !== 'number') {
      return false;
    }

      // Check if custom props exist, but they can be any, therefore skipping type check.

      return true;
  } catch (error) {
    console.error('Validation Error:', error);
    return false;
  }
};

export const validateJsonFile = (filePath: string, type: 'agent' | 'metric'): boolean => {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    return type === 'agent' ? validateAgent(jsonData) : validateMetric(jsonData);
  } catch (error) {
      console.error(`Error processing file ${filePath}:`, error);
    return false
  }
}

export const validateDirectory = (directoryPath: string, type: 'agent' | 'metric'): boolean => {
    let isValid = true;
    if (!fs.existsSync(directoryPath)) {
        console.error(`Directory not found: ${directoryPath}`)
        return false;
    }
    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const fullPath = path.join(directoryPath, file);
        if (path.extname(file) === '.json') {
            if (!validateJsonFile(fullPath, type)) {
                console.error(`Validation failed for file: ${fullPath}`);
                isValid = false;
            }
        }
    })
    return isValid;
}