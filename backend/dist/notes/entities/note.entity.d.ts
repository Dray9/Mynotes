import { User } from '../../users/entities/user.entity';
export declare class Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: number;
}
