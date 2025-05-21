import { Module } from '@nestjs/common';
import { BridgeService } from './bridge.service';
import { BridgeGateway } from './bridge.gateway';

@Module({
  providers: [BridgeGateway, BridgeService],
})
export class BridgeModule {}
