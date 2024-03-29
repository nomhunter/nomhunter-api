import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { VenueTagEntity } from "../venueTag/venue-tag.entity";

@Entity("tag")
export class TagEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => VenueTagEntity, (venueTagEntity) => venueTagEntity.tag)
  venueTags: VenueTagEntity[];
}
