import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpUtil } from "../../util/http.util";
import { FindConditions } from "typeorm/find-options/FindConditions";
import { ZoneEntity } from "./zone.entity";
import { CreateZoneDto } from "./dto/create-zone.dto";

@Injectable()
export class ZonesService {
  private readonly logger = new Logger(ZonesService.name);

  constructor(
    @InjectRepository(ZoneEntity)
    private readonly zoneEntityRepository: Repository<ZoneEntity>
  ) {}

  async findAll(
    conditions?: FindConditions<ZoneEntity>
  ): Promise<ZoneEntity[]> {
    if (conditions) {
      return this.zoneEntityRepository.find(conditions);
    }
    return this.zoneEntityRepository.find();
  }

  async getById(id: string): Promise<ZoneEntity> {
    return await this.zoneEntityRepository
      .findOneOrFail(id)
      .catch(HttpUtil.genericFindByUUIDErrorHandler("Zone", id, this.logger));
  }

  async create(createZoneDto: CreateZoneDto): Promise<ZoneEntity> {
    return await this.zoneEntityRepository.save(createZoneDto);
  }
}