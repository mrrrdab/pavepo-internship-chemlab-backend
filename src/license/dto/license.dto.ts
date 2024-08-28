import { ImageDTO } from 'src/common';

class LicenseDTO {
  readonly id: number;
  readonly title: string;
  readonly image: ImageDTO;
}

export class GetLicenseDTO extends LicenseDTO {}
