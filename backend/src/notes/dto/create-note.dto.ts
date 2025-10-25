import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'My Note Title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is my note content', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}