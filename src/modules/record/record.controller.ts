import { RecordService } from './record.service';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { IRecord } from './record.dto';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post('submit')
  async registerStudent(
    @Req() req: Request,
    @Res() res: Response,
    @Body() dt: IRecord,
  ) {
    let result = await this.recordService.submitRecord(dt);
    res.status(result.statusCode).send(result);
  }

  @Get('class-rank')
  async getClassRank(
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let result = await this.recordService.getClassRank();
    res.status(result.statusCode).send(result);
  }
}
