import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { GameCreatedEvent } from "../../../common/events/game-created.event";
import { PlayerMissionEntityService } from "../../../entities/playerMission/player-mission.entity.service";
import { MissionEntityService } from "../../../entities/mission/mission.entity.service";
import { MissionService } from "../mission.service";
import { VenueTagEntityService } from "../../../entities/venueTag/venue-tag.entity.service";

@Injectable()
export class GameCreatedListener {
  constructor(
    private readonly missionService: MissionService,
    private readonly missionEntityService: MissionEntityService,
    private readonly playerMissionEntityService: PlayerMissionEntityService,
    private readonly venueTagsEntityService: VenueTagEntityService
  ) {}

  @OnEvent("game.created", { async: true })
  async handleGameCreatedEvent(event: GameCreatedEvent) {
    // handle and process "GameCreatedEvent" event
    const game = event.game;
    const venueTags = await this.venueTagsEntityService.findByVenueId(
      game.venue.id
    );
    for (const venueTag of venueTags) {
      const missionsWithTag = await this.missionEntityService.findByTag(
        venueTag.tag
      );
      for (const missionWithTag of missionsWithTag) {
        await this.missionService.incrementProgress(
          game.player.id,
          missionWithTag.id
        );
      }
    }
  }
}
