import { Controller, Get } from '@nestjs/common';

import { Metadata, ResponseData } from 'src/common';

import { ContactService } from './contact.service';
import { GetBusinessPremiseContactDTO, GetDepartmentContactDTO, GetPrimaryContactDTO } from './dto';

@Controller('api/contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('primary')
  async getAllPrimaryContacts(): Promise<ResponseData<GetPrimaryContactDTO[]> & Metadata> {
    return this.contactService.getAllPrimaryContacts();
  }

  @Get('business-premises')
  async getAllBusinessPremisesContacts(): Promise<ResponseData<GetBusinessPremiseContactDTO[]> & Metadata> {
    return this.contactService.getAllBusinessPremisesContacts();
  }

  @Get('departments')
  async getAllDepartmentsContacts(): Promise<ResponseData<GetDepartmentContactDTO[]> & Metadata> {
    return this.contactService.getAllDepartmentsContacts();
  }
}
