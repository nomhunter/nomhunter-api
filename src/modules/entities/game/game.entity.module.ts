import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameEntity } from "./game.entity";
import { GameEntityService } from "./game.entity.service";
import { GameEntityController } from "./game.entity.controller";
import { PlayerEntityModule } from "../player/player.entity.module";
import { VenueEntityModule } from "../venue/venue.entity.module";
import { RedisModule } from "../../clients/redis/redis.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([GameEntity]),
    PlayerEntityModule,
    VenueEntityModule,
    RedisModule,
  ],
  controllers: [GameEntityController],
  providers: [GameEntityService],
  exports: [GameEntityService],
})
export class GameEntityModule {}