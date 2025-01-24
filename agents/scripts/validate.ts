// Imports the validation functions from src/utils/validation

import { validateDirectory } from '../src/utils/validation';
import * as path from 'path';

const AGENTS_DIR = path.join(__dirname, '../data/agents');
const METRICS_DIR = path.join(__dirname, '../data/metrics');

const validate = () => {
  let isValid = true;

  // Validate agents
    const agentsCategories = ['autonomous', 'analytics', 'marketing'];
    agentsCategories.forEach(category => {
        const agentPath = path.join(AGENTS_DIR, category);
         if (!validateDirectory(agentPath, 'agent')) {
            isValid = false;
         }
    })
  // Validate metrics
    const metricsPath = path.join(METRICS_DIR, 'daily');
     if (!validateDirectory(metricsPath, 'metric')) {
       isValid = false;
     }


  if (isValid) {
    console.log('All JSON files are valid!');
  } else {
    console.error('JSON validation failed. See errors above.');
      process.exit(1); // Exit with error code
  }
};

validate();