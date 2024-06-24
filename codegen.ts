import type { CodegenConfig } from '@graphql-codegen/cli';
import { env } from './src/environments/environment';

const config: CodegenConfig = {
  schema: env.apiUrl,
  documents: './src/**/*.graphql',
  generates: {
    './graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular']
    },
    './graphql/schema.graphql': {
      plugins: ['schema-ast']
    }
  }
};
export default config;
