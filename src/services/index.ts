import authService from './auth-service';
import config from '../config';

export default {
  authService: authService(config.auth),
};