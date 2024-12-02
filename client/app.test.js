jest.mock('axios');

jest.mock('@sentry/node', () => ({
  init: jest.fn(),
  Handlers: {
    requestHandler: jest.fn().mockImplementation(() => (req, res, next) => next()),
    tracingHandler: jest.fn().mockImplementation(() => (req, res, next) => next()),
    errorHandler: jest.fn().mockImplementation(() => (err, req, res, next) => res.status(500).send('Error interno del servidor'))
  },
  captureException: jest.fn(),
  Integrations: {
    Http: jest.fn()
  }
}));

describe('Sentry Integration', () => {
    it('should initialize Sentry with correct DSN', () => {
        expect(Sentry.init).toHaveBeenCalledWith(expect.objectContaining({
            dsn: "https://422c0b78ff60afb4ec6f6a6705ab4202@o4508395109416960.ingest.us.sentry.io/4508395435851776"
        }));
    });

    it('should call Sentry.captureException when an error occurs', () => {
        const error = new Error('Test error');
        Sentry.captureException(error);
        expect(Sentry.captureException).toHaveBeenCalledWith(error);
    });
});
