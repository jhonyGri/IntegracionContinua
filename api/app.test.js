const Sentry = require('@sentry/node');
const app = require('./app');

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

describe('Sentry Integration', () => {

    it('should set tracesSampleRate correctly', () => {
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            tracesSampleRate: 1.0
        }));
    });
});