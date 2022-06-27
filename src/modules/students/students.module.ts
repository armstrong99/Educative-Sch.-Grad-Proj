import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Student from 'src/entities/student';

@Module({
  providers: [StudentsService],
  controllers: [StudentsController],
  imports: [TypeOrmModule.forFeature([Student])],

})
export class StudentsModule {}
