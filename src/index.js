import app from '../app.js';
import {createConnection} from './database.js'

createConnection();

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on ${port}`);
})