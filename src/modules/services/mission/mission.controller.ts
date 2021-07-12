import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { MissionService } from "./mission.service";
import JwtAuthGuard from "../auth/guard/jwt-auth.guard";
import { RequestWithPlayer } from "../auth/interface/request-with-player.interface";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { MissionGroupEntityService } from "../../entities/missionGroup/mission-group.entity.service";
import { MissionGroupEntity } from "../../entities/missionGroup/mission-group.entity";

@ApiTags("Mission")
@Controller("mission")
export class MissionController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly missionService: MissionService,
    private readonly missionGroupEntityService: MissionGroupEntityService
  ) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Fetch missions for player" })
  @ApiCreatedResponse({
    description: "Mission created successfully for player",
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async fetchMissions(
    @Req() requestWithPlayer: RequestWithPlayer
  ): Promise<MissionGroupEntity[]> {
    return this.missionGroupEntityService.fetchAllMissionsForPlayer(
      requestWithPlayer.user.id
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Claim Reward" })
  @ApiCreatedResponse({
    description: "Claim Reward for Completed Mission",
  })
  @Get("/:missionId/claim")
  @UseGuards(JwtAuthGuard)
  async claimReward(
    @Req() requestWithPlayer: RequestWithPlayer,
    @Param("missionId") missionId: string
  ): Promise<void> {
    return this.missionService.claimReward(
      requestWithPlayer.user.id,
      missionId
    );
  }
}
