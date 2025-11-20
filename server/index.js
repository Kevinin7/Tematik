const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const matchRoutes = require('./routes/matchRoutes');
const predictionRoutes = require('./routes/predictionRoutes');

const app = express();

// ✅ Middlewares primero
app.use(cors());
app.use(express.json());

// ✅ Rutas después de los middlewares
app.use('/api/users', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/predict', predictionRoutes);

// ✅ Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado a MongoDB');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT || 5000}`);
  });
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});