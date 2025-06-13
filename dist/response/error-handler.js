import { GenericError } from "./error.js";
export function handleError(err, res) {
  if (err instanceof Error) {
    const e = new GenericError({
      status: err.status || 500,
      message: err.message || 'An unknown error occurred',
      error: err,
      origin: 'external'
    });
    return res.status(e.status || 500).json(e);
  }

  // default for other errors
  const e = new GenericError({
    message: 'An unexpected error occurred',
    error: err,
    origin: 'unknown'
  });
  return res.status(e.status || 500).json(e);
}
//# sourceMappingURL=error-handler.js.map