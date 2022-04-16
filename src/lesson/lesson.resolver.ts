import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';
import { StudentService } from 'src/student/student.service';
import { LessonService } from './lesson.service';
import {
  LessonType,
  CreateLessonInput,
  AssignStudentsToLessonInput,
} from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentsService: StudentService,
  ) {}

  @Query(() => LessonType)
  async lesson(@Args('id') id: string) {
    return this.lessonService.findById(id);
  }

  @Query(() => LessonType)
  async lessons() {
    return this.lessonService.findAll();
  }

  @Mutation(() => LessonType)
  createLesson(@Args('input') input: CreateLessonInput) {
    return this.lessonService.create(input);
  }

  @Mutation(() => LessonType)
  async assignStudentsToLesson(
    @Args('input') assignStudentsToLessonInput: AssignStudentsToLessonInput,
  ) {
    return this.lessonService.assignStudentsToLesson(
      assignStudentsToLessonInput,
    );
  }

  @ResolveField(() => [Student])
  async students(@Parent() lesson: LessonType) {
    return this.studentsService.findByIds(lesson.studentsIds);
  }
}
