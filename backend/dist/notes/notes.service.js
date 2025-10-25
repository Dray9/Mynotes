"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("./entities/note.entity");
const user_entity_1 = require("../users/entities/user.entity");
let NotesService = class NotesService {
    notesRepository;
    usersRepository;
    constructor(notesRepository, usersRepository) {
        this.notesRepository = notesRepository;
        this.usersRepository = usersRepository;
    }
    async create(createNoteDto, userId) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const note = this.notesRepository.create({
            ...createNoteDto,
            user,
            userId,
        });
        return this.notesRepository.save(note);
    }
    async findAllByUser(userId) {
        return this.notesRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id, userId) {
        const note = await this.notesRepository.findOne({
            where: { id, userId },
        });
        if (!note) {
            throw new common_1.NotFoundException('Note not found');
        }
        return note;
    }
    async update(id, updateNoteDto, userId) {
        const note = await this.findOne(id, userId);
        Object.assign(note, updateNoteDto);
        note.updatedAt = new Date();
        return this.notesRepository.save(note);
    }
    async remove(id, userId) {
        const note = await this.findOne(id, userId);
        await this.notesRepository.remove(note);
        return { message: 'Note deleted successfully' };
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], NotesService);
//# sourceMappingURL=notes.service.js.map