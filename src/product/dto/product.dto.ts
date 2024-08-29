import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { Category } from '@prisma/client';
import { IsNumber, IsOptional } from 'class-validator';

import { ImageDTO, PaginationQueryParams } from '../../common';

class ProductDTO {
  readonly id: number;
  readonly category: Category;
  readonly productType: string;
  readonly model: string;
  readonly manufacturer: string;
  readonly originCountries: string[];
  readonly description: string;
  readonly price: number;
  readonly discount: number;
  readonly weight: number;
  readonly color: string;
  readonly images: ImageDTO[];
  readonly advantages: AdvantageDTO[];
  readonly specs: SpecDTO[];
  readonly files: FileDTO[];
  readonly accessories: AccessoryDTO[];
  readonly transportationData: TransportationDTO[];
}

export class GetProductDTO extends ProductDTO {}

export class AdvantageDTO {
  readonly id: number;
  readonly title: string;
  readonly content: string;
}

export class SpecDTO {
  readonly id: number;
  readonly spec: string;
  readonly value: string;
  readonly measurementUnit?: string;
}

export class FileDTO {
  readonly id: number;
  readonly label: string;
  readonly url: string;
  readonly image: ImageDTO;
}

export class AccessoryDTO {
  readonly id: number;
  readonly name: string;
  readonly quantity?: number;
}

export class TransportationDTO {
  readonly id: number;
  readonly name: string;
  readonly value: string;
  readonly measurementUnit?: string;
}

export class AggregatedInfoDTO {
  readonly priceRange: {
    min: number;
    max: number;
  };
  readonly manufacturers: string[];
  readonly weights: number[];
  readonly colors: string[];
}

export class ProductFiltersQueryParams {
  readonly category: Category;

  @IsOptional()
  @IsNumber()
  readonly priceMin: number;

  @IsOptional()
  @IsNumber()
  readonly priceMax: number;

  readonly manufacturer: string;

  @IsOptional()
  @IsNumber()
  readonly weightMin: number;

  @IsOptional()
  @IsNumber()
  readonly weightMax: number;
  readonly colors: string[];
}

export class GetProductsQueryParams extends IntersectionType(
  PartialType(ProductFiltersQueryParams),
  PaginationQueryParams,
) {}

export class GetAggregatedInfoQueryParams {
  category: Category;
}
