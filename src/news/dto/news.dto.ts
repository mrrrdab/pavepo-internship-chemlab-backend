import { ImageDTO } from 'src/common';

class NewsDTO {
  readonly id: number;
  readonly title: string;
  readonly date: Date;
  readonly content: string;
  readonly images: ImageDTO[];
}

export class GetNewsDTO extends NewsDTO {}
