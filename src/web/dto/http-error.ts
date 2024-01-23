class HttpError {
  constructor(readonly code: number, readonly messages: string[]) { }
}

export { HttpError };
