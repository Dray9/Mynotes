import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { User } from '../users/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const note = this.notesRepository.create({
      ...createNoteDto,
      user,
      userId,
    });

    return this.notesRepository.save(note);
  }

  async findAllByUser(userId: number) {
    return this.notesRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number) {
    const note = await this.notesRepository.findOne({
      where: { id, userId },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, userId: number) {
    const note = await this.findOne(id, userId);

    Object.assign(note, updateNoteDto);
    note.updatedAt = new Date();

    return this.notesRepository.save(note);
  }

  async remove(id: number, userId: number) {
    const note = await this.findOne(id, userId);
    await this.notesRepository.remove(note);
    return { message: 'Note deleted successfully' };
  }
}