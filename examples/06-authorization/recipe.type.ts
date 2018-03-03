import { GraphQLObjectType, Field, Int, Authorized, Float } from "../../src";

@GraphQLObjectType()
export class Recipe {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Authorized() // restrict access to ingredients only for logged users (paid subscription?)
  @Field(itemType => String)
  ingredients: string[];

  @Authorized("ADMIN") // restrict access to rates details for admin only
  @Field(type => Int, { array: true })
  ratings: number[];

  @Field(type => Float, { nullable: true })
  get averageRating(): number | null {
    return this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
  }
}
