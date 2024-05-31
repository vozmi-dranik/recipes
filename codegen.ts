import type { CodegenConfig } from '@graphql-codegen/cli';
// import { env } from './src/environments/environment';


import * as dotenv from 'dotenv';
import * as process from 'node:process';
dotenv.config();

const config: CodegenConfig = {
  schema: process.env?.['API_URL'] || '',
  // schema: env.apiUrl,
  documents: './src/**/*.graphql',
  generates: {
    './graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular']
    }
  }
};
export default config;
