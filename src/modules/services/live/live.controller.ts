import { Controller, Get, Logger } from "@nestjs/common";
import { LiveService } from "./live.service";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ZoneInterface } from "./interface/zone.interface";

@ApiTags("Live")
@Controller("live")
export class LiveController {
  private readonly logger = new Logger(LiveController.name);

  constructor(private readonly liveService: LiveService) {}

  // TODO: Add JWT and Auth Bear Swagger when player specific details are added (visited / ranked)
  @ApiOperation({ summary: "Fetch live venues summary details" })
  @ApiOkResponse({ description: "Live venues retrieved successfully" })
  @Get()
  async getLiveZonesAndVenues(): Promise<ZoneInterface[]> {
    this.logger.log("Fetching live zones and venues details");
    return this.liveService.getLiveZonesAndVenues();
  }
}
