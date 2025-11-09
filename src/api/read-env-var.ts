export const readEnvVarOrThrow = (key: string, error: Error): string => {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    throw error;
  }
  return value;
};

export const readEnvVarOrNull = (key: string): string | null => {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    return null;
  }
  return value;
};

export const readEnvVarOrDefault = (
  key: string,
  defaultValue: string
): string => {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    return defaultValue;
  }
  return value;
};
