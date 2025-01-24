# Agents Repository ❤️

This repository contains various autonomous, analytics, and marketing agents.  

## Project Structure
- **src/**: Source code for agent types, utilities, and constants  
- **data/**: JSON data files for agent definitions  
- **scripts/**: Build and maintenance scripts  

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Explore agents in [data/agents](./data/agents/).

## How to Use
Create a new scripts/build.ts file and paste the associated code.  
Run the script:
```bash
node scripts/build.ts
```
Or add it to package.json:
```json
"scripts": {
  "validate": "node scripts/validate.ts",
  "build": "node scripts/build.ts"
}
```
Then:
```bash
npm run build
```
Use this code with caution.

## Adding a New Agent
Create a JSON file in the appropriate category folder under data/agents.  
After adding the file, run the validation script:
```bash
node scripts/validate.ts
```
Or configure in your package.json:
```json
"scripts": {
  "validate": "node scripts/validate.ts"
}
```
Then:
```bash
npm run validate
```
Finally, open a pull request with your changes, ensuring validation passes ✌️

