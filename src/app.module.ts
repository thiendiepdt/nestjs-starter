import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import databaseConfig from './configs/database.config'
import appConfig from './configs/app.config'
import validationSchema from './configs/validation-schema'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './databases/typeorm-config.service'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      validationSchema: validationSchema
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
