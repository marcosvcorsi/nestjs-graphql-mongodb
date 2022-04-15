import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { CreateStudentInput, StudentType } from './student.type';

@Resolver()
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Mutation(() => StudentType)
  async createStudent(@Args('input') input: CreateStudentInput) {
    return this.studentService.create(input);
  }
}
