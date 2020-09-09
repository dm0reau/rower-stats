export function getEnvVar(varName: string): string {
  if (process.env[varName] === undefined) {
    throw new Error(`ENV var ${varName} must be defined`)
  }
  return process.env[varName]
}
