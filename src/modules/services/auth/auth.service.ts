import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PlayerEntityService } from "../../entities/player/player.entity.service";
import { PlayerEntity } from "../../entities/player/player.entity";
import { RegisterReq } from "./req/register.req";
import { HttpExceptions } from "../../common/constants/http.exceptions";
import { TokenResponseInterface } from "./interface/token-response.interface";
import { QueryFailedError } from "typeorm";
import { AvatarService } from "../avatar/avatar.service";
import { PlayerWalletEntityService } from "../../entities/playerWallet/player-wallet.entity.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly playerEntityService: PlayerEntityService,
    private readonly avatarService: AvatarService,
    private readonly playerWalletEntityService: PlayerWalletEntityService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Encrypts password by adding a salt and hashing it, then creating a new Player entity
   * @param registrationData
   */
  public async register(registrationData: RegisterReq): Promise<PlayerEntity> {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);

    try {
      const createdPlayer: PlayerEntity = await this.playerEntityService.create({
        ...registrationData,
        password: hashedPassword,
      });
      await this.avatarService.createStockAvatar(createdPlayer);
      await this.playerWalletEntityService.createNewPlayerWallet(createdPlayer);
      return createdPlayer;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException("Player with that email already exists", HttpStatus.BAD_REQUEST);
      }
      throw new HttpException("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * JWT service signs the player's email and id as bearer token
   * @param player Player entity from the database
   */
  public login(player: PlayerEntity): TokenResponseInterface {
    const payload = { email: player.email, sub: player.id };
    return {
      bearerToken: this.jwtService.sign(payload),
    };
  }

  /**
   * For LocalStrategy Authentication, Validates Player Credentials
   * @param email Entered Email
   * @param plainTextPassword Entered Plain-text Password
   */
  public async validatePlayer(email: string, plainTextPassword: string): Promise<PlayerEntity> {
    try {
      const player = await this.playerEntityService.getByEmail(email);
      const correctPassword = await AuthService.verifyPassword(plainTextPassword, player.password);
      if (player && correctPassword) {
        return player;
      }
    } catch (e) {
      throw HttpExceptions.INCORRECT_CREDENTIALS;
    }
    throw HttpExceptions.INCORRECT_CREDENTIALS;
  }

  private static async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}
