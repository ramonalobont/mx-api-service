import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DelegationLegacyService } from "./delegation.legacy.service";
import { DelegationLegacy } from "./entities/delegation.legacy";

@Controller()
@ApiTags('delegation')
export class DelegationLegacyController {
  constructor(private readonly delegationLegacyService: DelegationLegacyService) { }

  @Get("/delegation-legacy")
  @ApiOperation({ summary: 'Legacy delegation statistics', description: 'Returns legacy delegation contract global information' })
  @ApiResponse({
    status: 200,
    type: DelegationLegacy,
  })
  async getBlock(): Promise<DelegationLegacy> {
    return await this.delegationLegacyService.getDelegation();
  }
}
