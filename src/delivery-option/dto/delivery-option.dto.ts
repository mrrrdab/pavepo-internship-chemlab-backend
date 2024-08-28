class DeliveryOptionDTO {
  readonly id: number;
  readonly type: string;
  readonly label: string;
  readonly price: number;
  readonly description: string;
}

export class GetDeliveryOptionDTO extends DeliveryOptionDTO {}
