import app from './app.js'
import { db } from './src/utils/database.util.js';

const PORT = 3000;

db.authenticate()
  .then(() => console.log('Db authenticated'))
  .catch(err => console.log(err));

// initModels();

db.sync()
  .then(() => console.log('Db synced'))
  .catch(err => console.log(err));

const PORTAPI = PORT || 3000;





app.listen(PORT, () => console.log('Servidor express', PORTAPI));