import { Controller, Get } from '@nestjs/common';
import { AboutService } from './about.service';
import { Result } from '../../common/result';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  async findAll() {
    return new Result(await this.aboutService.findAll());
  }
}
