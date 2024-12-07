const Sentry = require("@sentry/node");
const express = require("express");
const app = express();
const PORT = 3000;

Sentry.init({
    dsn: "https://422c0b78ff60afb4ec6f6a6705ab4202@o4508395109416960.ingest.us.sentry.io/4508395435851776",
    integrations: [
        new Sentry.Integrations.Http({ tracing: true}),
    ],
    tracesSampleRate:1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/", (req, res) => {
    res.send("Hola desde la API!");
});

app.use(Sentry.Handlers.errorHandler());

app.listen(PORT, () => {
    console.log(`Aplicación escuchando en puerto ${PORT}`);
});