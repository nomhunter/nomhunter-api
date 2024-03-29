import { ApiProperty } from "@nestjs/swagger";
import { FileType } from "../file.type";

export class CreateFileDto {
  @ApiProperty()
  type: FileType;

  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;
}
