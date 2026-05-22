// Temporary script to deduplicate jokes
import fs from 'fs';
import path from 'path';

// Read the jokes-data.ts file
const jokesDataPath = path.join(process.cwd(), 'lib', 'jokes-data.ts');
const content = fs.readFileSync(jokesDataPath, 'utf-8');

// Extract the jokes array
// We need to parse the content to get the array
const jokesMatch = content.match(/export const JOKES_DATA: string\[\] = \[([\s\S]*?)\];/);

if (!jokesMatch) {
  console.error('Could not find JOKES_DATA array');
  process.exit(1);
}

// Extract the jokes strings
const jokesContent = jokesMatch[1];
const jokeRegex = /"([^"\\]*(\\.[^"\\]*)*)"/g;
const jokes: string[] = [];
let match;

while ((match = jokeRegex.exec(jokesContent)) !== null) {
  jokes.push(match[1]);
}

// Deduplicate
const uniqueJokes = [...new Set(jokes)];

console.log(`Original: ${jokes.length} jokes`);
console.log(`Unique: ${uniqueJokes.length} jokes`);
console.log(`Removed ${jokes.length - uniqueJokes.length} duplicates`);

// Create new content
const newContent = `// lib/jokes-data.ts v5.7.1
// Deduplicated jokes data

export const JOKES_DATA: string[] = [
${uniqueJokes.map(joke => `  "${joke.replace(/"/g, '\\"')}"`).join(',\n')}
];
`;

// Write back
fs.writeFileSync(jokesDataPath, newContent, 'utf-8');
console.log('Jokes deduplicated successfully!');
