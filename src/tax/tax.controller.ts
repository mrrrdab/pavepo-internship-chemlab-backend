import { Controller, Get } from '@nestjs/common';

import { Metadata, ResponseData } from 'src/common';

import { TaxService } from './tax.service';
import { GetTaxDTO } from './dto/tax.dto';

@Controller('api/taxes')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get()
  async getAllTaxes(): Promise<ResponseData<GetTaxDTO[]> & Metadata> {
    return this.taxService.getAllTaxes();
  }
}
