import { Injectable } from '@nestjs/common';
import { Image, License } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { Metadata, PaginationQueryParams, ResponseData } from '../common';
import { GetLicenseDTO } from './dto';

@Injectable()
export class LicenseService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllLicenses(params: PaginationQueryParams): Promise<ResponseData<GetLicenseDTO[]> & Metadata> {
    const licenses = await this.prismaService.license.findMany({
      skip: params.skip,
      take: params.take,
      include: {
        image: true,
      },
    });

    const data = licenses.map(license => this.mapLicenseToDTO(license));

    return { data, metadata: { totalCount: await this.prismaService.license.count() } };
  }

  private mapLicenseToDTO(license: License & { image: Image }): GetLicenseDTO {
    return {
      id: license.id,
      title: license.title,
      image: {
        id: license.image.id,
        url: license.image.url,
        priority: license.image.priority ?? undefined,
      },
    };
  }
}
