import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType, CreateLessonInput } from './lesson.type';

@Resolver()
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query(() => LessonType)
  async lesson(@Args('id') id: string) {
    return this.lessonService.findById(id);
  }

  @Mutation(() => LessonType)
  createLesson(@Args('input') input: CreateLessonInput) {
    return this.lessonService.create(input);
  }
}
