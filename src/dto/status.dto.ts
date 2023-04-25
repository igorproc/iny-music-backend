import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType("status", { description: "sucsess operation status" })
export class SuccsessOperationStatus {
  @Field(() => Int, { description: "code", nullable: true })
  code: number;

  @Field(() => String, { nullable: true })
  message: string;
}