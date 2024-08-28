import { Injectable } from '@nestjs/common';
import {
  BusinessPremiseContact,
  PrimaryContact,
  DepartmentContact,
  ExtensionPhoneNumber,
  Image,
  OrderPassPhoneNumber,
} from '@prisma/client';

import { Metadata, ResponseData } from '../common';
import { PrismaService } from '../prisma.service';
import { GetBusinessPremiseContactDTO, GetDepartmentContactDTO, GetPrimaryContactDTO } from './dto';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPrimaryContacts(): Promise<ResponseData<GetPrimaryContactDTO[]> & Metadata> {
    const contacts = await this.prismaService.primaryContact.findMany();

    const data = contacts.map(contact => this.mapPrimaryContactToDTO(contact));

    return { data, metadata: { totalCount: await this.prismaService.primaryContact.count() } };
  }

  async getAllBusinessPremisesContacts(): Promise<ResponseData<GetBusinessPremiseContactDTO[]> & Metadata> {
    const contacts = await this.prismaService.businessPremiseContact.findMany({
      include: { image: true, orderPassPhoneNumbers: true },
    });

    const data = contacts.map(contact => this.mapBusinessPremiseContactToDTO(contact));

    return { data, metadata: { totalCount: await this.prismaService.businessPremiseContact.count() } };
  }

  async getAllDepartmentsContacts(): Promise<ResponseData<GetDepartmentContactDTO[]> & Metadata> {
    const contacts = await this.prismaService.departmentContact.findMany({ include: { extensionPhoneNumbers: true } });

    const data = contacts.map(contact => this.mapDepartmentContactToDTO(contact));

    return { data, metadata: { totalCount: await this.prismaService.departmentContact.count() } };
  }

  private mapPrimaryContactToDTO(contact: PrimaryContact): GetPrimaryContactDTO {
    return {
      id: contact.id,
      label: contact.label,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };
  }

  private mapBusinessPremiseContactToDTO(
    contact: BusinessPremiseContact & { image: Image; orderPassPhoneNumbers: OrderPassPhoneNumber[] },
  ): GetBusinessPremiseContactDTO {
    return {
      id: contact.id,
      label: contact.label,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email ?? undefined,
      orderPassPhoneNumbers: contact.orderPassPhoneNumbers.map(phoneNumber => ({
        id: phoneNumber.id,
        phoneNumber: phoneNumber.phoneNumber,
      })),
      image: {
        id: contact.image.id,
        url: contact.image.url,
        priority: contact.image.priority ?? undefined,
      },
    };
  }

  private mapDepartmentContactToDTO(
    contact: DepartmentContact & { extensionPhoneNumbers: ExtensionPhoneNumber[] },
  ): GetDepartmentContactDTO {
    return {
      id: contact.id,
      label: contact.label,
      phoneNumber: contact.phoneNumber,
      email: contact.phoneNumber,
      extensionPhoneNumbers: contact.extensionPhoneNumbers,
    };
  }
}
