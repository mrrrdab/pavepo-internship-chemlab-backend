/* eslint-disable max-len */
import { Injectable, NotFoundException } from '@nestjs/common';

import { CATEGORIES } from '../constants';
import { Metadata, PaginationQueryParams, ResponseData } from '../common';
import { AggregatedInfoDTO, GetAggregatedInfoQueryParams, GetProductDTO, GetProductsQueryParams } from './dto';

@Injectable()
export class ProductService {
  async getSpecialOffers(
    params: PaginationQueryParams,
    locale: string,
  ): Promise<ResponseData<GetProductDTO[]> & Metadata> {
    const query = new URLSearchParams({
      'filters[discount][$gt]': '0',
      populate:
        'images.image,originCountries,images.image,advantages,specs,files.preview,accessories,transportationData',
      locale: locale,
    });

    if (params.skip !== undefined) {
      query.append('pagination[start]', String(params.skip));
    }

    if (params.take !== undefined) {
      query.append('pagination[limit]', String(params.take));
    }

    const response = await fetch(`${process.env.CMS_DOMAIN}/api/products?${query.toString()}`);
    const result = await response.json();

    const data = result.data.map((product: any) => this.mapProductToDTO(product));
    const totalCount = result.meta.pagination.total;

    return { data, metadata: { totalCount } };
  }

  async getAggregatedInfo(
    params: GetAggregatedInfoQueryParams,
    locale: string,
  ): Promise<ResponseData<AggregatedInfoDTO>> {
    const query = new URLSearchParams({
      'filters[category]': CATEGORIES[params.category],
    });

    query.append('fields', 'price');
    query.append('fields', 'manufacturer');
    query.append('fields', 'weight');
    query.append('fields', 'color');

    const response = await fetch(`${process.env.CMS_DOMAIN}/api/products?${query.toString()}&locale=${locale}`);

    const result = await response.json();
    const products = result.data;

    const manufacturers: string[] = [
      ...new Set(products.map((product: any) => product.attributes.manufacturer)),
    ] as string[];
    const weights = [...new Set(products.map((product: any) => product.attributes.weight))] as number[];
    const colors = [...new Set(products.map((product: any) => product.attributes.color))] as string[];

    const priceRange = products.reduce(
      (range: { min: number; max: number }, product: any) => {
        const price = product.attributes.price;
        if (price < range.min) range.min = price;
        if (price > range.max) range.max = price;
        return range;
      },
      { min: Infinity, max: -Infinity },
    );

    return { data: { priceRange, manufacturers, weights, colors } };
  }

  async getProduct(id: number, locale: string): Promise<ResponseData<GetProductDTO>> {
    const response = await fetch(
      `${process.env.CMS_DOMAIN}/api/products/${id}?populate=images.image,originCountries,advantages,specs,files.preview,accessories,transportationData,localizations.images.image,localizations.originCountries,localizations.advantages,localizations.specs,localizations.files.preview,localizations.accessories,localizations.transportationData`,
    );

    const result = await response.json();
    const product = result.data;

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const localizedProduct =
      product.attributes.localizations.data.find((localization: any) => localization.attributes.locale === locale) ||
      product.attributes;

    const data = this.mapProductToDTO(localizedProduct);

    return { data };
  }

  async getProducts(params: GetProductsQueryParams, locale: string): Promise<ResponseData<GetProductDTO[]> & Metadata> {
    const query = new URLSearchParams();

    if (params.category) {
      query.append('filters[category]', CATEGORIES[params.category]);
    }

    if (params.productType) {
      query.append('filters[productType][$startsWith]', params.productType);
    }

    if (params.model) {
      query.append('filters[model][$contains]', params.model);
    }

    if (params.manufacturer) {
      query.append('filters[manufacturer]', params.manufacturer);
    }

    if (params.priceMin !== undefined && params.priceMax !== undefined) {
      query.append('filters[price][$gte]', String(params.priceMin));
      query.append('filters[price][$lte]', String(params.priceMax));
    }

    if (params.weightMin !== undefined && params.weightMax !== undefined) {
      query.append('filters[weight][$gte]', String(params.weightMin));
      query.append('filters[weight][$lte]', String(params.weightMax));
    }

    if (params.colors) {
      if (Array.isArray(params.colors)) {
        query.append('filters[color][$in]', params.colors.join(','));
      } else {
        query.append('filters[color]', params.colors);
      }
    }

    if (params.skip !== undefined) {
      query.append('pagination[start]', String(params.skip));
    }

    if (params.take !== undefined) {
      query.append('pagination[limit]', String(params.take));
    }

    query.append(
      'populate',
      'images.image,originCountries,images.image,advantages,specs,files.preview,accessories,transportationData',
    );

    const response = await fetch(`${process.env.CMS_DOMAIN}/api/products?${query.toString()}&locale=${locale}`);

    const result = await response.json();

    const data = result.data.map((product: any) => this.mapProductToDTO(product));
    const totalCount = result.meta.pagination.total;

    return { data, metadata: { totalCount } };
  }

  async getSimilarProducts(
    productId: number,
    params: PaginationQueryParams,
    locale: string,
  ): Promise<ResponseData<GetProductDTO[]> & Metadata> {
    const productResponse = await fetch(
      `${process.env.CMS_DOMAIN}/api/products/${productId}?populate=category,manufacturer`,
    );

    const productResult = await productResponse.json();
    const product = productResult.data;

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const attributes = product.attributes;

    const query = new URLSearchParams({
      '_or[0][filters][category]': attributes.category,
      '_or[1][filters][manufacturer]': attributes.manufacturer,
      'filters[id][$ne]': String(productId),
      locale: locale,
    });

    if (params.skip !== undefined) {
      query.append('pagination[start]', String(params.skip));
    }

    if (params.take !== undefined) {
      query.append('pagination[limit]', String(params.take));
    }

    query.append(
      'populate',
      'images.image,originCountries,advantages,specs,files.preview,accessories,transportationData',
    );

    const response = await fetch(`${process.env.CMS_DOMAIN}/api/products?${query.toString()}`);

    const result = await response.json();

    const data = result.data.map((product: any) => this.mapProductToDTO(product));
    const totalCount = result.meta.pagination.total;

    return { data, metadata: { totalCount } };
  }

  private mapProductToDTO(product: any): GetProductDTO {
    const attributes = product.attributes || product;

    return {
      id: product.id,
      category: attributes.category,
      productType: attributes.productType,
      model: attributes.model,
      manufacturer: attributes.manufacturer,
      originCountries: attributes.originCountries.map((country: any) => country.value),
      description: attributes.description,
      price: attributes.price,
      discount: attributes.discount,
      weight: attributes.weight,
      color: attributes.color,
      images: attributes.images.map((image: any) => ({
        id: image.id,
        url: `${process.env.CMS_DOMAIN}${image.image.data.attributes.url}`,
        priority: image.priority ?? 0,
      })),
      advantages: attributes.advantages.map((advantage: any) => ({
        id: advantage.id,
        label: advantage.label,
        content: advantage.content,
      })),
      specs: attributes.specs.map((spec: any) => ({
        id: spec.id,
        spec: spec.spec,
        value: spec.value,
        measurementUnit: spec.measurementUnit ?? undefined,
      })),
      files: attributes.files.map((file: any) => ({
        id: file.id,
        title: file.title,
        url: file.url,
        preview: {
          id: file.preview.data.id,
          url: `${process.env.CMS_DOMAIN}${file.preview.data.attributes.url}`,
        },
      })),
      accessories: attributes.accessories.map((accessory: any) => ({
        id: accessory.id,
        name: accessory.name,
        quantity: accessory.quantity ?? undefined,
      })),
      transportationData: attributes.transportationData.map((data: any) => ({
        id: data.id,
        name: data.name,
        value: data.value,
        measurementUnit: data.measurementUnit ?? undefined,
      })),
    };
  }
}
