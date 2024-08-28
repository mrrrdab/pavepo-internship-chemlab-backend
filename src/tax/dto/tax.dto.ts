class TaxDTO {
  readonly id: number;
  readonly type: string;
  readonly value: number;
}

export class GetTaxDTO extends TaxDTO {}
