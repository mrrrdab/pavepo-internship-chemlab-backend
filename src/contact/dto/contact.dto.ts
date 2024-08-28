import { ImageDTO } from 'src/common';

class PrimaryContactDTO {
  readonly id: number;
  readonly label: string;
  readonly address: string;
  readonly phoneNumber: string;
  readonly email: string;
}

export class GetPrimaryContactDTO extends PrimaryContactDTO {}

class BusinessPremiseContactDTO {
  readonly id: number;
  readonly label: string;
  readonly image: ImageDTO;
  readonly address: string;
  readonly phoneNumber: string;
  readonly email?: string;
  readonly orderPassPhoneNumbers: OrderPassPhoneNumberDTO[];
}

export class GetBusinessPremiseContactDTO extends BusinessPremiseContactDTO {}

class DepartmentContactDTO {
  readonly id: number;
  readonly label: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly extensionPhoneNumbers: ExtensionPhoneNumberDTO[];
}

export class GetDepartmentContactDTO extends DepartmentContactDTO {}

export class OrderPassPhoneNumberDTO {
  readonly id: number;
  readonly phoneNumber: string;
}

export class ExtensionPhoneNumberDTO {
  readonly id: number;
  readonly phoneNumber: string;
}
