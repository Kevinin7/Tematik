require('dotenv').config();
console.log('✅ dotenv cargado');

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const predictionRoutes = require('./routes/predictionRoutes');


console.log('✅ módulos importados');

const app = express();
app.use(cors());
app.use(express.json());

console.log('✅ middlewares aplicados');

connectDB();

app.use('/api/predictions', predictionRoutes);
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const matchRoutes = require('./routes/matchRoutes');
app.use('/api/matches', matchRoutes);

console.log('✅ rutas cargadas');

app.listen(5000, () => {
  console.log('🚀 Servidor corriendo en puerto 5000');
});