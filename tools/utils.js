import {readdir, readFile, mkdir} from 'fs/promises';
import {dirname, relative, resolve, basename} from 'path';
import {fileURLToPath} from 'url';

// The ES module version of Node.js does not have the __dirname and __filename variables. So, we need to define them manually.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const projectDirName = resolve(__dirname, '..');

// The source directory is where the Markdown files are stored, and the destination directory is where the HTML files will be generated.
export const srcDir = resolve(projectDirName, 'src');
export const destDir = resolve(projectDirName, 'docs');

export const srcBooksDir = resolve(srcDir, 'books');
export const srcEssayDir = resolve(srcDir, 'essays');
export const bannersDir = resolve(destDir, 'assets', 'banners');

export async function getMarkdownFiles(dir) {
    const notes = await readdir(dir);
    return notes.filter(note => note.endsWith('.md'));
}

export function getSrcPath(markdownFileName) {
    return resolve(srcDir, markdownFileName);
}

export async function getDestPath(dir, markdownFileName) {
    const fileDir = resolve(destDir, basename(relative(srcDir, dir)));

    // Create dir if not exists.
    await mkdir(fileDir, {recursive: true });

    return resolve(fileDir, markdownFileName.replace('.md', '.html'));
}

export function getToolsPath(fileName) {
    return resolve(__dirname, fileName);
}

export async function readFileText(filePath) {
    return await readFile(filePath, 'utf8');
}

export function getBannerPath(markdownFileName) {
    return relative(destDir, resolve(bannersDir, markdownFileName.replace('.md', '.jpg')));
}