"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const note_entity_1 = require("../notes/entities/note.entity");
exports.databaseConfig = {
    type: 'sqlite',
    database: process.env.DATABASE_PATH || './database.sqlite',
    entities: [user_entity_1.User, note_entity_1.Note],
    synchronize: true,
    logging: false,
};
//# sourceMappingURL=database.config.js.map