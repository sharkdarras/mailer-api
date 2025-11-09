export const readEnvVarOrThrow = (key: string, error: Error): string => {
  const value = process.env[key];
  if (!value) {
    throw error;
  }
  return value;
};
