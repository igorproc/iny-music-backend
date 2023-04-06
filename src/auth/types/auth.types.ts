export type TAuthPayload = {
  email: string
  password: string
}

export type TUserDataFromDatabase = {
  password: string,
  uid: number,
}

export type TSignInToken = {
  access_token: string
}
