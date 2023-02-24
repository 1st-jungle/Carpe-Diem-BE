import config from '../../config';
import devLogger from './devLogger';
import productionLogger from './productionLogger';

const logger = config.node_env === 'production' ? productionLogger : devLogger;

export default logger;
