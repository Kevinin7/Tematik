const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Middleware primero
app.use(cors());
app.use(express.json());

// ✅ Rutas después del middleware
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/matches', require('./routes/matchRoutes'));
app.use('/api/predict', require('./routes/predictionRoutes'));

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