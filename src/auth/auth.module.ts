import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Collection } from 'mongoose';

@Module({
  controllers: [AuthController],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: AuthModule,
        schemaOptions: {
          collection: 'Auth'
        }
      }
    ])
  ]
})
export class AuthModule {}
