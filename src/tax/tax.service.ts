import { Injectable } from '@nestjs/common';
import { Tax } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { Metadata, ResponseData } from '../common';
import { GetTaxDTO } from './dto';

@Injectable()
export class TaxService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllTaxes(): Promise<ResponseData<GetTaxDTO[]> & Metadata> {
    const taxes = await this.prismaService.tax.findMany();

    const data = taxes.map(tax => this.mapTaxToDTO(tax));

    return { data, metadata: { totalCount: await this.prismaService.tax.count() } };
  }

  private mapTaxToDTO(tax: Tax): GetTaxDTO {
    return {
      id: tax.id,
      type: tax.type,
      value: tax.value,
    };
  }
}
