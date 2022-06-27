import { StudentsService } from './students.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EWithRecord, IRegStudent } from './student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentService: StudentsService) {}

  @Post('/register')
  async registerStudent(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dt: IRegStudent,
  ) {
    let result = await this.studentService.registerStudent(dt);
    res.status(result.statusCode).send(result);
  }


  @Get('/retrieve-student')
  async getStudentById(
    @Req() req: Request,
    @Res() res: Response,
    @Query() dt: {id:number, withRecord: EWithRecord},
  ) {
    let result = await this.studentService.getStudentById(dt);
    res.status(result.statusCode).send(result);
  }
}
