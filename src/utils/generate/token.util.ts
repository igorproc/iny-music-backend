export function generateToken(): string {
  const token = Date.now().toString(36) + Math.random().toString(36).substr(2)
  return token
}