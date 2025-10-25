import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { User } from '../users/entities/user.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
export declare class NotesService {
    private notesRepository;
    private usersRepository;
    constructor(notesRepository: Repository<Note>, usersRepository: Repository<User>);
    create(createNoteDto: CreateNoteDto, userId: number): Promise<Note>;
    findAllByUser(userId: number): Promise<Note[]>;
    findOne(id: number, userId: number): Promise<Note>;
    update(id: number, updateNoteDto: UpdateNoteDto, userId: number): Promise<Note>;
    remove(id: number, userId: number): Promise<{
        message: string;
    }>;
}
