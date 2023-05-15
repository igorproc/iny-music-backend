import { registerEnumType } from "@nestjs/graphql";

export enum UserGender {
  male = "MALE",
  female = "FEMALE",
}
registerEnumType(UserGender, {
  name: 'UserGender'
})

export enum UserRole {
  user = 'USER',
  author = 'AUTHOR',
  admin = "ADMIN",
  label = "LABEL",
  manager = "MANAGER",
}
registerEnumType(UserRole, {
  name: 'UserRole'
})

export enum UserBlocking {
  deleted = 'DELETED',
  blocked = 'BLOCKED',
  copyright = 'COPYRIGHT'
}
registerEnumType(UserBlocking, {
  name: 'UserBlocking'
})