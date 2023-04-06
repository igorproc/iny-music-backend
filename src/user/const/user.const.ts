import { genSaltSync } from "bcrypt";

export const SALT_ROUNDS: number = 5
export const SALT: string = genSaltSync(SALT_ROUNDS)
