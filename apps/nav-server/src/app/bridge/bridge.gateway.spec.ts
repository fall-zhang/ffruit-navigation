import { Test, TestingModule } from '@nestjs/testing';
import { BridgeGateway } from './bridge.gateway';
import { BridgeService } from './bridge.service';

describe('BridgeGateway', () => {
  let gateway: BridgeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BridgeGateway, BridgeService],
    }).compile();

    gateway = module.get<BridgeGateway>(BridgeGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
