import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Record from 'src/entities/record';
import Student from 'src/entities/student';
import { IResponse } from 'src/global';
import { Repository } from 'typeorm';
import { IRecord } from './record.dto';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record) private _recordRepo: Repository<Record>,
    @InjectRepository(Student)
    private _studentRepo: Repository<Student>,
  ) {}

  async submitRecord(dt: IRecord): Promise<IResponse<Record>> {
    try {
      let foundStudent = await this._studentRepo.findOne({
        where: {
          id: dt.studentId,
        },
      });

      if (!foundStudent) throw new Error('No student with this id exist');

      let studentRecord = await this._recordRepo.save({
        ...dt,
        student: foundStudent,
      });

      return {
        data: studentRecord,
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Record saved successfully',
      };
    } catch (e) {
      return {
        message: (e as Error).message,
        status: false,
        statusCode: HttpStatus.NOT_IMPLEMENTED,
      };
    }
  }

  async getClassRank(): Promise<IResponse<Record[]>> {
    try {
      //query
      // get the average marks of each student for each course in DESC order
      // let foundClassRecords:Record[]

      let foundClassRank = await this._recordRepo.query(`
            SELECT "studentId", "class", avg(score) as avs
            FROM record
            GROUP BY "class", "studentId"
            ORDER BY class, avs DESC
                    `);
      //  find({
      //   where:
      //      Raw(`
      //   SELECT "studentId", "class", avg(score) as avs
      //   FROM record
      //   GROUP BY "class", "studentId"
      //   ORDER BY class, avs DESC
      //   `),

      // });

      console.log('fin::::: ', foundClassRank);
      return {
        data: foundClassRank,
        status: true,
        statusCode: HttpStatus.OK,
        message: 'Class ranks successfully fetched',
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
