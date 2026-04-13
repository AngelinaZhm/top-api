import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { ModelType, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
	constructor(@InjectModel(TopPageModel) private readonly topPageModel: ReturnModelType<typeof TopPageModel>) {}
	
	async create(dto: CreateTopPageDto) {
		const newPage = new this.topPageModel(dto);
    	return newPage.save();
	}

	async findById(id: string) {
		return this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return this.topPageModel.findOne({ alias }).exec();
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return this.topPageModel.findOne({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 }).exec();
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndRemove(id).exec();
	}

	async updateById(id: string, dto: CreateTopPageDto) {
		return this.topPageModel.findByIdAndUpdate(id, dto, { new: true}).exec();
	}

}
