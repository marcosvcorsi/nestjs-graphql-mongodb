import { Query, Resolver } from '@nestjs/graphql';
import { Lesson } from './lesson.type';

@Resolver()
export class LessonResolver {
  @Query(() => Lesson)
  async lesson() {
    return null;
  }
}
