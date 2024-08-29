import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { Metadata, PaginationQueryParams, ResponseData } from '../common';
import { ProductService } from './product.service';
import { AggregatedInfoDTO, GetAggregatedInfoQueryParams, GetProductDTO, GetProductsQueryParams } from './dto';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('special-offers')
  async getSpecialOffers(@Query() params: PaginationQueryParams): Promise<ResponseData<GetProductDTO[]> & Metadata> {
    return this.productService.getSpecialOffers(params);
  }

  @Get('aggregated-info')
  async getAggregatedInfo(@Query() params: GetAggregatedInfoQueryParams): Promise<ResponseData<AggregatedInfoDTO>> {
    return await this.productService.getAggregatedInfo(params);
  }

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number): Promise<ResponseData<GetProductDTO>> {
    return this.productService.getProduct(id);
  }

  @Get()
  async getProducts(@Query() params: GetProductsQueryParams): Promise<ResponseData<GetProductDTO[]> & Metadata> {
    return this.productService.getProducts(params);
  }
}
