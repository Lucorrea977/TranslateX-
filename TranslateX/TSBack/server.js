const express = require("express");
const cors = require("cors");
require("dotenv").config();

const translateRoute = require("./routes/translate");

const app = express();
app.use(cors());
app.use(express.json());

// Ruta base para verificar conexión
app.get("/", (req, res) => {
  res.send("✅ Servidor TranslateX corriendo correctamente");
});

// Rutas de traducción
app.use("/api/translate", translateRoute);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend corriendo en http://localhost:${PORT}`));
