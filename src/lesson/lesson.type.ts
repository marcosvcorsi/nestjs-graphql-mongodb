import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { IsDate, IsUUID, MinLength } from 'class-validator';
import { Student } from 'src/student/student.entity';
import { StudentType } from 'src/student/student.type';

@ObjectType('Lesson')
export class LessonType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  studentsIds: string[];

  @Field(() => [StudentType])
  students: Student[];
}

@InputType()
export class CreateLessonInput {
  @Field()
  @MinLength(1)
  name: string;

  @Field(() => Date)
  @IsDate()
  startDate: Date;

  @Field(() => Date)
  @IsDate()
  endDate: Date;

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  studentsIds: string[];
}

@InputType()
export class AssignStudentsToLessonInput {
  @IsUUID('4')
  @Field(() => ID)
  lessonId: string;

  @IsUUID('4', { each: true })
  @Field(() => [ID])
  studentIds: string[];
}
