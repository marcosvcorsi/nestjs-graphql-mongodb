import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';

type CreateLessonParams = {
  name: string;
  startDate: Date;
  endDate: Date;
};

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) {}

  async create({ name, startDate, endDate }: CreateLessonParams) {
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });

    return this.lessonRepository.save(lesson);
  }

  async findById(id: string) {
    return this.lessonRepository.findOne({
      where: { id },
    });
  }

  async findAll() {
    return this.lessonRepository.find();
  }
}
