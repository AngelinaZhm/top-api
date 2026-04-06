// import { ConfigService } from '@nestjs/config';
// import { TypegooseModuleOptions } from 'nestjs-typegoose';

// export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
// 	return {
// 		uri: getMongoString(configService),
// 		...getMongoOptions()
// 	};
// };

// const getMongoString = (configService: ConfigService) => 
// 	'mongodb://' + 
// 	configService.get('MONGO_LOGIN') +
// 	':'+ 
// 	configService.get('MONGO_PASSWORD') +
// 	'@'+ 
// 	configService.get('MONGO_HOST') +
// 	':'+ 
// 	configService.get('MONGO_PORT') +
// 	'/' + 
// 	configService.get('MONGO_AUTHDATABASE');

// const getMongoOptions = () => ({
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true
// });

import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

// 🔹 ПРОСТИЙ і правильний варіант
const getMongoString = (configService: ConfigService): string => {
  return configService.get<string>('MONGO_URI') || 'mongodb://localhost:27017/test';
};

// 🔹 сучасні опції (без deprecated)
const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
