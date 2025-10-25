import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getUserById(id: string): Promise<import("./entities/user.entity").User | null>;
    getAllUsers(): Promise<import("./entities/user.entity").User[]>;
}
