export function ensureIsTestEnvironment() {
  if (process.env.NODE_ENV !== 'test') throw new Error('Should be is test environment');
}
