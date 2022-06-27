import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Record from 'src/entities/record';
import Student from 'src/entities/student';

@Module({
  providers: [RecordService],
  controllers: [RecordController],
  imports: [TypeOrmModule.forFeature([Record, Student])],

})
export class RecordModule {}
