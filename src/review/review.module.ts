import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ReviewService } from './review.service';
import { ReviewModel } from './review.model';

@Module({
  controllers: [ReviewController],
  imports: [
      TypegooseModule.forFeature([
        {
          typegooseClass: ReviewModel,
          schemaOptions: {
            collection: 'review'
          }
        }
      ])
    ],
  providers: [ReviewService],
  exports: [ReviewService]
})
export class ReviewModule {}
