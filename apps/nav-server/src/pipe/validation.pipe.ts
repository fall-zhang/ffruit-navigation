
import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus, BadRequestException } from '@nestjs/common'
import { ZodSchema } from 'zod'

@Injectable()
export class ParseCodeTypePipe implements PipeTransform {
  transform (value: string, metadata: ArgumentMetadata) {
    const isValidate = ['chart', 'table'].includes(value)
    if (isValidate) {
      return value
    }
    throw new HttpException(`传入的该值：${value} 错误`, HttpStatus.FORBIDDEN)
  }
}


export class ZodValidatePipe implements PipeTransform {
  constructor (private schema:ZodSchema) { }

  transform (value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value)
      return parsedValue
    } catch (err) {
      throw new BadRequestException(`传入${value}参数类型错误`)
    }
  }
}
