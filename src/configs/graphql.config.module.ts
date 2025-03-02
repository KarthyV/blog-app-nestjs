import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule as NestGraphQLModule } from "@nestjs/graphql";

@Module({
    imports: [
        NestGraphQLModule.forRoot({
            driver: ApolloDriver,
            playground: true,
            introspection: true,
            autoSchemaFile: './src/schema.gql',
            context: ({ req, res }: { req: Request, res: Response }) => ({ req, res }),
            buildSchemaOptions: { 
                numberScalarMode: 'integer'
            }
        })
    ],
    exports: [NestGraphQLModule],
})
export class GraphQLModule {}