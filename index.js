const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors());
app.get("/canciones", (req, res) => {
  try {
    const data = fs.readFileSync("./repertorio.json", "utf-8");
    const canciones = JSON.parse(data);
    res.json(canciones);
    console.log(canciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/canciones", (req, res) => {
  try {
    const data = fs.readFileSync("./repertorio.json", "utf-8");
    const canciones = JSON.parse(data);
    const nuevaCancion = req.body;
    canciones.push(nuevaCancion);
    fs.writeFileSync("./repertorio.json", JSON.stringify(canciones));
    res.status(201).send("Cancion Agregada correctamente!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/canciones/:id", (req, res) => {
  try {
    const cancionId = req.params.id;
    const data = fs.readFileSync("./repertorio.json", "utf-8");
    const canciones = JSON.parse(data);
    const updateCancion = req.body;
    console.log(updateCancion)
    const cancionIndex = canciones.findIndex((cancion) => parseInt(cancion.id) === parseInt(cancionId));
    console.log(cancionIndex, )
    if (cancionIndex === -1) {
      res.status(404).json({ error: "Cancion no encontrada" });
    } else {
      canciones[cancionIndex] = {
        ...canciones[cancionIndex],
        ...updateCancion,
      };
      fs.writeFileSync("./repertorio.json", JSON.stringify(canciones));
      res.json(updateCancion).send("cancion actualizada").status(200);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/canciones/:id", (req, res) => {
  try {
    const cancionId = req.params.id;
    const data = fs.readFileSync("./repertorio.json", "utf-8");
    const canciones = JSON.parse(data);
    cancionesFiltro = canciones.filter(item => item.id != cancionId);
    fs.writeFileSync("./repertorio.json", JSON.stringify(cancionesFiltro));
    res.send("cancion eliminada")
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, console.log("¡Servidor encendido!"));
