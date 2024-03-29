import { Module } from "@nestjs/common";
import { PlayerEntityModule } from "../../entities/player/player.entity.module";
import { GameEntityModule } from "../../entities/game/game.entity.module";
import { VenueEntityModule } from "../../entities/venue/venue.entity.module";
import { PlayerBadgeEntityModule } from "../../entities/playerBadge/player-badge.entity.module";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { PlayerWalletEntityModule } from "../../entities/playerWallet/player-wallet.entity.module";
import { TransactionEntityModule } from "../../entities/transaction/transaction.entity.module";

@Module({
  imports: [
    GameEntityModule,
    VenueEntityModule,
    PlayerBadgeEntityModule,
    PlayerWalletEntityModule,
    PlayerEntityModule,
    TransactionEntityModule,
  ],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
