export function generateToken(): string {
  const token = Math.random().toString(36).substr(2)
  return token + token 
}