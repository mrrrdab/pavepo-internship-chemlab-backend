import { Injectable } from '@nestjs/common';
import { DeliveryOption } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { Metadata, ResponseData } from '../common';
import { GetDeliveryOptionDTO } from './dto';

@Injectable()
export class DeliveryOptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllDeliveryOptions(): Promise<ResponseData<GetDeliveryOptionDTO[]> & Metadata> {
    const deliveryOptions = await this.prismaService.deliveryOption.findMany();

    const data = deliveryOptions.map(deliveryOption => this.mapDeliveryOptionToDTO(deliveryOption));

    return { data, metadata: { totalCount: await this.prismaService.deliveryOption.count() } };
  }

  private mapDeliveryOptionToDTO(deliveryOption: DeliveryOption): GetDeliveryOptionDTO {
    return {
      id: deliveryOption.id,
      type: deliveryOption.type,
      label: deliveryOption.label,
      description: deliveryOption.description,
      price: deliveryOption.price,
    };
  }
}
