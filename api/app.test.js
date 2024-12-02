const request = require('supertest');
const express = require('express');
const Sentry = require('@sentry/node');
const app = express();

// Mock de Sentry
jest.mock('@sentry/node', () => ({
    init: jest.fn(),
    Handlers: {
        requestHandler: jest.fn().mockImplementation(() => (req, res, next) => next()),
        tracingHandler: jest.fn().mockImplementation(() => (req, res, next) => next()),
        errorHandler: jest.fn().mockImplementation(() => (err, req, res, next) => res.status(500).send('Error interno del servidor'))
    },
    Integrations: {
        Http: jest.fn()
    }
}));

const PORT = 3000;

Sentry.init({
    dsn: "https://dummy-dsn",
    integrations: [
        new Sentry.Integrations.Http({ tracing: true}),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.get("/", (req, res) => {
    res.send("Hola desde la API!");
});

app.use(Sentry.Handlers.errorHandler());

describe('Test API', () => {
    it('should respond with 200 on GET /', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hola desde la API!');
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
