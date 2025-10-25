import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Notes')
@Controller('api/notes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post()
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new note' })
  async create(@Body() createNoteDto: CreateNoteDto, @Request() req) {
    return this.notesService.create(createNoteDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes for logged-in user' })
  async findAll(@Request() req) {
    return this.notesService.findAllByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific note' })
  async findOne(@Param('id') id: string, @Request() req) {
    return this.notesService.findOne(parseInt(id), req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a note' })
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Request() req,
  ) {
    return this.notesService.update(parseInt(id), updateNoteDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  async remove(@Param('id') id: string, @Request() req) {
    return this.notesService.remove(parseInt(id), req.user.id);
  }
}