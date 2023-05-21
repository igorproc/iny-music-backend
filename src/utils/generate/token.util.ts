import { hashSync } from 'bcrypt';
export function generateToken(): string {
  const SALT = "genearate PLAYLIST 1023.385"
  const token = Date.now().toString(36) + Math.random().toString(36).substr(2)
  return hashSync(token, SALT)
}