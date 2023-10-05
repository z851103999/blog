import { Logger } from '@nestjs/common';
import * as process from 'process';

export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export default () => {
  let envConfig: IConfig = {};
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    envConfig = require(`./config.${process.env.NODE_ENV}`).default();
    process.env.uploadPath = envConfig.uploadPath ?? '/upload';
  } catch (e) {
    const logger = new Logger('ConfigModule');
    logger.error(e);
  }
  return envConfig;
};

export interface IConfig {
  /**
   * 后台管理jwt token密钥
   */
  jwt?: {
    secret: string;
  };

  /**
   * 文件上传路径， 绝对路径  例如： E:/upload/test
   */
  uploadPath?: string;

  /**
   * 数据库配置
   */
  database?: {
    type?: string;
    host?: string;
    port?: number | string;
    username?: string;
    password?: string;
    database?: string;
    autoLoadModels: boolean; // 如果为true，模型将自动载入（默认:false)
    synchronize?: boolean; //如果为true，自动载入的模型将同步
    logging?: any;
  };

  /**
   * redis 配置
   */
  redis?: {
    config: {
      url: string;
    };
  };
}
