const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 4000;

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("http://api:3000");
        res.send(`El client recibió el mensaje: ${response.data}`);
    } catch (error) {
        res.send("Error al comunicarse con la API");
    }
});

app.listen(PORT, () => {
    console.log(`Cliente escuchando en puerto ${PORT}`);
});