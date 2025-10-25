import { Note } from '../../notes/entities/note.entity';
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    notes: Note[];
}
