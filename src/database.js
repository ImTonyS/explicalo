import { Low } from 'lowdb'; //Json file crear el archivo donde estaran los datos y low para interactuar con ellos
import { JSONFile } from 'lowdb/node';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let db;

export async function createConnection() {
    const file = join(__dirname, '../db.json')
    const adapter = new JSONFile(file);
    db = new Low(adapter, {posts: [] });

    await db.read();

    db.data ||= {posts: []}

    await db.write();
    
}

export const getConnection = () => db;
export default __dirname;
