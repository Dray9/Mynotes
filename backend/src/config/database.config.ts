import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Note } from '../notes/entities/note.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: process.env.DATABASE_PATH || './database.sqlite',
  entities: [User, Note],
  synchronize: true,
  logging: false,
};