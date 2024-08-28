import { Injectable, NotFoundException } from '@nestjs/common';
import { Accessory, Advantage, File, Image, Prisma, Product, Spec, Transportation } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { CATEGORIES } from '../constants';
import { Metadata, PaginationQueryParams, ResponseData } from '../common';
import { AggregatedInfoDTO, GetProductDTO, GetProductsQueryParams } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getSpecialOffers(params: PaginationQueryParams): Promise<ResponseData<GetProductDTO[]> & Metadata> {
    const products = await this.prismaService.product.findMany({
      where: {
        discount: {
          gt: 0,
        },
      },
      skip: params.skip,
      take: params.take,
      include: {
        images: true,
        advantages: true,
        specs: true,
        files: { include: { image: true } },
        accessories: true,
        transportationData: true,
      },
    });

    const data = products.map(product => this.mapProductToDTO(product));

    const totalCount = await this.prismaService.product.count({
      where: {
        discount: {
          gt: 0,
        },
      },
    });

    return { data, metadata: { totalCount } };
  }

  async getAggregatedInfo(): Promise<ResponseData<AggregatedInfoDTO>> {
    const products = await this.prismaService.product.findMany({
      select: {
        manufacturer: true,
        weight: true,
        price: true,
        color: true,
      },
    });

    const manufacturers = [...new Set(products.map(product => product.manufacturer))];
    const weights = [...new Set(products.map(product => product.weight))];
    const colors = [...new Set(products.map(product => product.color))];

    const priceRange = products.reduce(
      (range, product) => {
        if (product.price < range.min) range.min = product.price;
        if (product.price > range.max) range.max = product.price;
        return range;
      },
      { min: Infinity, max: -Infinity },
    );

    return { data: { manufacturers, weights, priceRange, colors } };
  }

  async getProduct(id: number): Promise<ResponseData<GetProductDTO>> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        images: true,
        advantages: true,
        specs: true,
        files: { include: { image: true } },
        accessories: true,
        transportationData: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const data = this.mapProductToDTO(product);

    return { data };
  }

  async getProducts(params: GetProductsQueryParams): Promise<ResponseData<GetProductDTO[]> & Metadata> {
    const whereConditions: Prisma.ProductWhereInput = {};

    if (params.category) {
      whereConditions.category = CATEGORIES[params.category];
    }

    if (params.priceMin !== undefined && params.priceMax !== undefined) {
      whereConditions.price = {
        gte: params.priceMin,
        lte: params.priceMax,
      };
    }

    if (params.manufacturer) {
      whereConditions.manufacturer = params.manufacturer;
    }

    if (params.weightMin !== undefined && params.weightMax !== undefined) {
      whereConditions.weight = {
        gte: params.weightMin,
        lte: params.weightMax,
      };
    }

    if (params.colors) {
      if (Array.isArray(params.colors)) {
        whereConditions.color = {
          in: params.colors,
        };
      } else {
        whereConditions.color = params.colors;
      }
    }

    const products = await this.prismaService.product.findMany({
      where: whereConditions,
      skip: params.skip,
      take: params.take,
      include: {
        images: true,
        advantages: true,
        specs: true,
        files: { include: { image: true } },
        accessories: true,
        transportationData: true,
      },
    });

    const data = products.map(product => this.mapProductToDTO(product));

    const totalCount = await this.prismaService.product.count({
      where: whereConditions,
    });

    return { data, metadata: { totalCount } };
  }

  private mapProductToDTO(
    product: Product & {
      images: Image[];
      advantages: Advantage[];
      specs: Spec[];
      files: (File & { image: Image })[];
      accessories: Accessory[];
      transportationData: Transportation[];
    },
  ): GetProductDTO {
    return {
      id: product.id,
      category: product.category,
      productType: product.productType,
      model: product.model,
      manufacturer: product.manufacturer,
      originCountries: product.originCountries,
      description: product.description,
      price: product.price,
      discount: product.discount,
      weight: product.weight,
      color: product.color,
      images: product.images.map(image => ({
        id: image.id,
        url: image.url,
        priority: image.priority ?? undefined,
      })),
      advantages: product.advantages.map(advantage => ({
        id: advantage.id,
        title: advantage.title,
        content: advantage.content,
      })),
      specs: product.specs.map(spec => ({
        id: spec.id,
        spec: spec.spec,
        value: spec.value,
        measurementUnit: spec.measurementUnit ?? undefined,
      })),
      files: product.files.map(file => ({
        id: file.id,
        label: file.label,
        url: file.url,
        image: {
          id: file.image.id,
          url: file.image.url,
          priority: file.image.priority ?? undefined,
        },
      })),
      accessories: product.accessories.map(accessory => ({
        id: accessory.id,
        name: accessory.name,
        quantity: accessory.quantity ?? undefined,
      })),
      transportationData: product.transportationData.map(data => ({
        id: data.id,
        name: data.name,
        value: data.value,
        measurementUnit: data.measurementUnit ?? undefined,
      })),
    };
  }
}
