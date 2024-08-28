import { Controller, Get } from '@nestjs/common';

import { Metadata, ResponseData } from '../common';
import { DeliveryOptionService } from './delivery-option.service';
import { GetDeliveryOptionDTO } from './dto';

@Controller('api/delivery-options')
export class DeliveryOptionController {
  constructor(private readonly deliveryOptionService: DeliveryOptionService) {}

  @Get()
  async getAllDeliveryOptions(): Promise<ResponseData<GetDeliveryOptionDTO[]> & Metadata> {
    return this.deliveryOptionService.getAllDeliveryOptions();
  }
}
