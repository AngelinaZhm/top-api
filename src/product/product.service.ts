import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ProductModel } from './product.model';
import { ReturnModelType } from '@typegoose/typegoose/lib/types';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from 'src/review/review.model';

@Injectable()
export class ProductService {
	constructor(@InjectModel(ProductModel) private readonly productModel: ReturnModelType<typeof ProductModel>) {}

	async create(dto: CreateProductDto) {
		const product = new this.productModel(dto);
		return product.save();
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findWithReviews(dto: FindProductDto) {
		return this.productModel.aggregate([
			{
				$match: {
					categories: dto.category
				}
			},
			{
				$sort: {
					_id: 1
				}
			},
			{
				$limit: dto.limit
			},
			{
				$lookup: {
					from: 'review',
					let: { productId: '$_id' },
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ['$productId', { $toString: '$$productId' }]
								}
							}
						},
						{
							$sort: { createdAt: -1 }
						}
					],
					as: 'reviews'
				}
			},
			{
				$addFields: {
					reviewCount: { $size: '$reviews' },
					reviewAvg: { $avg: '$reviews.rating' },
					reviews: {
						$function: {
							body: `function (reviews) {
								reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
								return reviews;
							}`,
							args: ['$reviews'],
							lang: 'js'
						}
					}
				}
			}
		]).exec() as (ProductModel & { review: ReviewModel[], reviewCount: number, reviewAvg: number })[];
	}
}
