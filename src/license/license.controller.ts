import { Controller, Get, Query } from '@nestjs/common';

import { Metadata, PaginationQueryParams, ResponseData } from '../common';
import { LicenseService } from './license.service';
import { GetLicenseDTO } from './dto';

@Controller('api/licenses')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get()
  async getAllLicenses(@Query() params: PaginationQueryParams): Promise<ResponseData<GetLicenseDTO[]> & Metadata> {
    return this.licenseService.getAllLicenses(params);
  }
}
