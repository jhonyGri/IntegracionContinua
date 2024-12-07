const express = require("express");
const axios = require("axios");
const Sentry = require("@sentry/node");
const app = express();
const PORT = 4000;

Sentry.init({
    dsn:"https://422c0b78ff60afb4ec6f6a6705ab4202@o4508395109416960.ingest.us.sentry.io/4508395435851776",
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/", async (req, res) => {
    try {
        const response = await axios.get("http://api:3000");
        res.send(`El client recibió el mensaje: ${response.data}`);
    } catch (error) {
        res.send("Error al comunicarse con la API");
    }
});

app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
    console.log(`Cliente escuchando en puerto ${PORT}`);
});

try {
  foo();
} catch (e) {
  Sentry.captureException(e);
}