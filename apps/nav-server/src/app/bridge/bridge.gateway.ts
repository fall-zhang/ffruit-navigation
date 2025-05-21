import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets'
import { BridgeService } from './bridge.service'
import { CreateBridgeDto } from './dto/create-bridge.dto'
import { UpdateBridgeDto } from './dto/update-bridge.dto'

@WebSocketGateway()
export class BridgeGateway {
  constructor (private readonly bridgeService: BridgeService) {}

  @SubscribeMessage('createBridge')
  create (@MessageBody() createBridgeDto: CreateBridgeDto) {
    return this.bridgeService.create(createBridgeDto)
  }

  @SubscribeMessage('findAllBridge')
  findAll () {
    return this.bridgeService.findAll()
  }

  @SubscribeMessage('findOneBridge')
  findOne (@MessageBody() id: number) {
    return this.bridgeService.findOne(id)
  }

  @SubscribeMessage('updateBridge')
  update (@MessageBody() updateBridgeDto: UpdateBridgeDto) {
    return this.bridgeService.update(updateBridgeDto.id, updateBridgeDto)
  }

  @SubscribeMessage('removeBridge')
  remove (@MessageBody() id: number) {
    return this.bridgeService.remove(id)
  }
}
