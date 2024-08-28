import { Injectable } from '@nestjs/common';
import { Image, News } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';
import { Metadata, ResponseData } from 'src/common';

import { GetNewsDTO } from './dto';

@Injectable()
export class NewsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllNews(): Promise<ResponseData<GetNewsDTO[]> & Metadata> {
    const news = await this.prismaService.news.findMany({ include: { images: true } });

    const data = news.map(newsItem => this.mapNewsToDTO(newsItem));

    return { data, metadata: { totalCount: await this.prismaService.news.count() } };
  }

  private mapNewsToDTO(news: News & { images: Image[] }): GetNewsDTO {
    return {
      id: news.id,
      title: news.title,
      date: news.date,
      content: news.content,
      images: news.images.map(image => ({
        id: image.id,
        url: image.url,
        priority: image.priority ?? undefined,
      })),
    };
  }
}
