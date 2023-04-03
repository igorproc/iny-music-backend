export function validateEmail(userEmail: string): boolean {
  const regex = /[a-z0-9]+@[a-z]+\.[a-z]*/
  return !!userEmail.match(regex)
}
