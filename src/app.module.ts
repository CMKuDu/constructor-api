import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ActivityLogs } from './Enities/activity-log.entity';
import { BidItems } from './Enities/bid-item.entity';
import { Bids } from './Enities/bid.entity';
import { User } from './Enities/user.entity';
import { Role } from './Enities/role.entity';
import { Inventories } from './Enities/inventory.entity';
import { Material } from './Enities/material.entity';

// import { Medical } from './Enities/Medical.entity';
import { RenderModule } from './render/render.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleModule } from './modules/role/role.module';
import { MaterialModule } from './modules/material/material.module';
import { BidModule } from './modules/bid/bid.module';
import { BidItemModule } from './modules/bid-item/bid-item.module';
import { TokenModule } from 'src/modules/token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<string>('DB_PORT');
        const username = configService.get<string>('DB_USERNAME');
        const password = configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('DB_DATABASE');

        const url = `postgres://${username}:${password}@${host}:${port}/${database}`;
        return {
          type: 'postgres',
          url,
          entities: [
            User,
            Role,
            ActivityLogs,
            BidItems,
            Bids,
            Material,
            Inventories
          ],
          synchronize: configService.get<string>('DB_SYNC') === 'true',
          autoLoadEntities: true,
          ssl: {
            rejectUnauthorized: false
          }
        }
      }
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    UserModule,
    AuthModule,
    TokenModule,
    RoleModule,
    MaterialModule,
    BidModule,
    BidItemModule,
    RenderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
