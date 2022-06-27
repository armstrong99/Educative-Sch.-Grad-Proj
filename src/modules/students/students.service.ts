import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Student from 'src/entities/student';
import { IResponse } from 'src/global';
import { Repository } from 'typeorm';
import { EWithRecord, IRegStudent } from './student.dto';

@Injectable()
export class StudentsService {
  
  constructor(
    @InjectRepository(Student)
    private _studentRepo: Repository<Student>,
  ) {}

  async registerStudent(dt: IRegStudent): Promise<IResponse<Student>> {
    try {
      let registereStudent: Student = await this._studentRepo.save({
        name: dt.name,
        sex: dt.sex,
        class: dt.class,
      });

      return {
        message: 'Student registered successfully',
        status: true,
        statusCode: HttpStatus.OK,
        data: registereStudent,
      };
    } catch (e) {
      return {
        message: (e as Error).message,
        status: false,
        statusCode: HttpStatus.NOT_IMPLEMENTED,
      };
    }
  }

  async getStudentById({
    id,
    withRecord,
  }: {
    id: number;
    withRecord: EWithRecord;
  }): Promise<IResponse<Student>> {
    try {
      let foundStudent =
        withRecord === EWithRecord.RETRIEVE
          ? await this._studentRepo.findOne({
              where: {
                id,
              },
              relations: ['records'],
            })
          : await this._studentRepo.findOne({
              where: {
                id,
              },
            });

      if (!foundStudent) throw new Error('Student not found');
      else
        return {
          data: foundStudent,
          status: true,
          statusCode: HttpStatus.NOT_IMPLEMENTED,
          message: 'Found data for student',
        };
    } catch (e) {
      return {
        message: (e as Error).message,
        status: false,
        statusCode: HttpStatus.NOT_IMPLEMENTED,
      };
    }
  }
}
