import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { Metadata, PaginationQueryParams, ResponseData } from '../common';
import { ProductService } from './product.service';
import { AggregatedInfoDTO, GetAggregatedInfoQueryParams, GetProductDTO, GetProductsQueryParams } from './dto';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('special-offers')
  async getSpecialOffers(
    @Query() params: PaginationQueryParams,
    @Query('locale') locale: string,
  ): Promise<ResponseData<GetProductDTO[]> & Metadata> {
    return this.productService.getSpecialOffers(params, locale);
  }

  @Get('aggregated-info')
  async getAggregatedInfo(
    @Query() params: GetAggregatedInfoQueryParams,
    @Query('locale') locale: string,
  ): Promise<ResponseData<AggregatedInfoDTO>> {
    return await this.productService.getAggregatedInfo(params, locale);
  }

  @Get(':id')
  async getProduct(
    @Param('id', ParseIntPipe) id: number,
    @Query('locale') locale: string,
  ): Promise<ResponseData<GetProductDTO>> {
    return this.productService.getProduct(id, locale);
  }

  @Get(':id/similar')
  async getSimilarProducts(
    @Param('id', ParseIntPipe) id: number,
    @Query() params: PaginationQueryParams,
    @Query('locale') locale: string,
  ): Promise<ResponseData<GetProductDTO[]> & Metadata> {
    return this.productService.getSimilarProducts(id, params, locale);
  }

  @Get()
  async getProducts(
    @Query() params: GetProductsQueryParams,
    @Query('locale') locale: string,
  ): Promise<ResponseData<GetProductDTO[]> & Metadata> {
    return this.productService.getProducts(params, locale);
  }
}
