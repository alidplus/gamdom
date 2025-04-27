export function jsonError(error: unknown) {
  if (typeof error === "string")
    return {
      message: error,
    };
  else if (error instanceof Error)
    return {
      message: error.message,
    };

  return {
    message: "unknown error",
  };
}
