import { Controller, Get } from '@nestjs/common';

import { Metadata, ResponseData } from '../common';
import { NewsService } from './news.service';
import { GetNewsDTO } from './dto';

@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getAllNews(): Promise<ResponseData<GetNewsDTO[]> & Metadata> {
    return await this.newsService.getAllNews();
  }
}
