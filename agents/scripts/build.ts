// scripts/build.ts
import * as fs from 'fs';
import * as path from 'path';
import { Agent } from '../src/types/Agent';
import { validateAgent } from '../src/utils/validation';
import { Capability } from '../src/types/Capability'
const DATA_DIR = path.join(__dirname, '../data');
const AGENTS_DIR = path.join(DATA_DIR, 'agents');

const buildAgents = () => {
  const categories = ['autonomous', 'analytics', 'marketing'];

  categories.forEach(category => {
    const categoryDir = path.join(AGENTS_DIR, category);
    if (!fs.existsSync(categoryDir)) {
      console.error(`Directory not found: ${categoryDir}`);
      return;
    }

    const files = fs.readdirSync(categoryDir);

    files.forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(categoryDir, file);
          try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);

            if (validateAgent(jsonData)) {
              // Here, you can add any logic to transform or modify the agent data
                const agent = jsonData as Agent;
                const updatedAgent: Agent = {
                    ...agent,
                    // Example of modifying the capability
                    capabilities: agent.capabilities.map(cap => cap.toString()) as Capability[],
                };

              // For now, we'll simply copy the agent file.
               fs.writeFileSync(filePath, JSON.stringify(updatedAgent, null, 2));
              console.log(`Successfully built agent: ${file}`);
            } else {
              console.error(`Validation failed for agent: ${file}`);
            }
          } catch (error) {
            console.error(`Error processing file ${file}:`, error);
          }
        }
    });
  });
};


buildAgents();
console.log('Build process completed!');