// not needed right now but can be used in the future for more advanced validation and version based migration

import * as fs from 'fs';
import * as path from 'path';
import { validateAgent } from './validation';
import { Agent } from '../types/Agent';
import { Capability } from '../types/Capability'

const AGENTS_DIR = path.join(__dirname, '../../data/agents');
type AgentV0 = Omit<Agent, 'tags'> & {
    newProperty?: string
};

// Function to check if the object is of the old type
const isAgentV0 = (data: any): data is AgentV0 => {
    return typeof data.tags === 'undefined' || data.tags === null
}

// Function to migrate a single agent
const migrateAgent = (agent: AgentV0): Agent => {
    const {newProperty, ...rest} = agent;
    const migratedAgent: Agent = {
        ...rest,
        id: rest.id,
        name: rest.name,
        category: rest.category,
        type: rest.type,
        description: rest.description,
        capabilities: rest.capabilities,
        tags: [], // Set default for tags
        creator: rest.creator,
        created_at: rest.created_at,
        // If we want to populate tags based on some logic, we can add logic here, as well as any other transformations.
    };
    return migratedAgent;
}

const migrateJsonFile = (filePath: string): void => {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);

        if (isAgentV0(jsonData)) {
            const migratedData = migrateAgent(jsonData);
            // Validate that the data is now of type Agent
            if(validateAgent(migratedData)){
                fs.writeFileSync(filePath, JSON.stringify(migratedData, null, 2));
                console.log(`Successfully migrated ${filePath}`)
            } else {
                console.error(`Validation failed for migrated file: ${filePath}`)
            }
        }
    } catch (error) {
        console.error(`Error migrating file ${filePath}:`, error);
    }
}

export const migrateDirectory = (directoryPath: string): void => {
    if (!fs.existsSync(directoryPath)) {
        console.error(`Directory not found: ${directoryPath}`)
        return
    }
    const files = fs.readdirSync(directoryPath);
    files.forEach(file => {
        const fullPath = path.join(directoryPath, file);
        if (path.extname(file) === '.json') {
            migrateJsonFile(fullPath);
        }
    })
}

const migrateAgents = () => {
    const agentsCategories = ['autonomous', 'analytics', 'marketing'];
    agentsCategories.forEach(category => {
        const agentPath = path.join(AGENTS_DIR, category);
        migrateDirectory(agentPath)
    })
}


migrateAgents();