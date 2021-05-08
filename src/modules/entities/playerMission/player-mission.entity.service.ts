import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { PlayerMissionEntity } from "./player-mission.entity";
import { GenericEntityService } from "../generic.entity.service";
import { PlayerEntity } from "../player/player.entity";
import { MissionEntity } from "../mission/mission.entity";

@Injectable()
export class PlayerMissionEntityService extends GenericEntityService<
  PlayerMissionEntity
> {
  constructor(
    @InjectRepository(PlayerMissionEntity)
    private readonly playerMissionEntityRepository: Repository<
      PlayerMissionEntity
    >
  ) {
    super(
      playerMissionEntityRepository,
      new Logger(PlayerMissionEntityService.name),
      PlayerMissionEntity.name
    );
  }

  /**
   * Check player mission progress
   * Find PlayerMissionEntity with playerId and missionId
   * @param player
   * @param mission
   */
  async findByPlayerAndMission(
    player: PlayerEntity,
    mission: MissionEntity
  ): Promise<PlayerMissionEntity | undefined> {
    return this.playerMissionEntityRepository
      .createQueryBuilder("playerMission")
      .innerJoinAndSelect("playerMission.player", "player")
      .innerJoinAndSelect("playerMission.mission", "mission")
      .where("playerMission.player = :playerId", { playerId: player.id })
      .andWhere("playerMission.mission = :missionId", { missionId: mission.id })
      .getOne();
  }

  async findByPlayer(player: PlayerEntity): Promise<PlayerMissionEntity[]> {
    return this.queryJoin()
      .where("playerMission.player = :playerId", { playerId: player.id })
      .getMany();
  }

  private queryJoin(): SelectQueryBuilder<PlayerMissionEntity> {
    return this.playerMissionEntityRepository
      .createQueryBuilder("playerMission")
      .innerJoinAndSelect("playerMission.player", "player")
      .innerJoinAndSelect("playerMission.mission", "mission");
  }
}
