import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const customWebpackConfig = (config, { isServer }) => {
  if (!isServer) {
    config.resolve.alias['@konsta'] = path.resolve(__dirname, 'node_modules/konsta/config.js');
  }
  return config;
};

export default customWebpackConfig;
