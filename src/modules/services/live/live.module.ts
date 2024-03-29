import { Module } from "@nestjs/common";
import { LiveService } from "./live.service";
import { LiveController } from "./live.controller";

@Module({
  imports: [],
  providers: [LiveService],
  controllers: [LiveController],
})
export class LiveModule {}
