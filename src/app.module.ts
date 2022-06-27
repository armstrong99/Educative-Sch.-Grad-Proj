import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { config } from 'dotenv';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StudentsModule } from './modules/students/students.module';
import { RecordModule } from './modules/record/record.module';
import Record from './entities/record';
import Student from './entities/student';

config();
 
const SYNC = true;
 
export const dbConfig: TypeOrmModuleOptions = {
  url: process.env.DATABASE_URL,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
  type: 'postgres',
  entities: [Record, Student],
  logging: SYNC,
  synchronize: SYNC,
} as TypeOrmModuleOptions;

@Module({
  imports: [
     TypeOrmModule.forRoot(dbConfig),
     StudentsModule,
     RecordModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}