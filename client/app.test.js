const request = require('supertest');
const express = require('express');
const axios = require('axios');
const Sentry = require('@sentry/node');
const app = express();

// Mock de axios y Sentry
jest.mock('axios');
jest.mock('@sentry/node', () => ({
    init: jest.fn(),
    captureException: jest.fn(),
    Handlers: {
        requestHandler: jest.fn().mockImplementation(() => (req, res, next) => next()),
        tracingHandler: jest.fn().mockImplementation(() => (req, res, next) => next()),
        errorHandler: jest.fn().mockImplementation(() => (err, req, res, next) => res.status(500).send('Error interno del servidor'))
    },
    Integrations: {
        Http: jest.fn()
    }
}));

const PORT = 4000;

Sentry.init({
    dsn: "https://dummy-dsn",
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

describe('Test Cliente', () => {
    it('should return 200 and the message from the API', async () => {
        axios.get.mockResolvedValue({ data: 'Hola desde la API!' });

        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('El client recibió el mensaje: Hola desde la API!');
    });

    it('should return error message when API call fails', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Error al comunicarse con la API');
    });
   
});

describe('Sentry Integration', () => {
    it('should initialize Sentry with correct DSN', () => {
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            dsn: "https://dummy-dsn"
        }));
    });

    it('should set tracingSampleRate correctly', () => {
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            tracesSampleRate: 1.0
        }));
    });
});