import path from 'path';
import { config } from 'dotenv';

const testEnvFileName = '.env.test';

try {
  config({ path: path.resolve(process.cwd(), testEnvFileName) });
} catch (error) {
  console.error(`Файл "${testEnvFileName}" не найден`);
}
