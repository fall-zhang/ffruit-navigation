import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes, Query } from '@nestjs/common'
import { FeedbackService } from './feedback.service'
import { CreateFeedbackDto } from './dto/create-feedback.dto'
import { UpdateFeedbackDto } from './dto/update-feedback.dto'

@Controller('feedback')
export class FeedbackController {
  constructor (private readonly feedbackService: FeedbackService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create (@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto)
  }

  @Get()
  findAll (@Query() page:string) {
    return this.feedbackService.findAll()
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.feedbackService.findOne(+id)
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update (@Param('id') id: string, @Body() updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackService.update(+id, updateFeedbackDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.feedbackService.remove(+id)
  }
}
