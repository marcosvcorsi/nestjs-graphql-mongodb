import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

type CreateStudentParams = {
  firstName: string;
  lastName: string;
};

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create({ firstName, lastName }: CreateStudentParams) {
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async findAll() {
    return this.studentRepository.find();
  }

  async findById(id: string) {
    return this.studentRepository.findOne({
      where: {
        id,
      },
    });
  }
}
