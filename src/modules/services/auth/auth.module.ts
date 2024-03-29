import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { PlayerEntityModule } from "../../entities/player/player.entity.module";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtConfig } from "../../../config/jwt.config";
import { AvatarModule } from "../avatar/avatar.module";
import { PlayerWalletEntityModule } from "../../entities/playerWallet/player-wallet.entity.module";

@Module({
  imports: [
    PlayerEntityModule,
    PlayerWalletEntityModule,
    AvatarModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigService],
      useClass: JwtConfig,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
