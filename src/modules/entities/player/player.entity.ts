import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { GameEntity } from "../game/game.entity";
import { PlayerBadgeEntity } from "../playerBadge/player-badge.entity";

@Entity("player")
export class PlayerEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  @Exclude()
  password: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  profilePic: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => GameEntity, (game) => game.player)
  games: GameEntity[];

  @OneToMany(() => PlayerBadgeEntity, (playerBadge) => playerBadge.player)
  playerBadges: PlayerBadgeEntity[];
}