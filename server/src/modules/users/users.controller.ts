import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from '../../decorators/user.decorator'
import { AuthGuard } from '../../guards/auth.guard'


@Controller('users')
export class UsersController {
  constructor(private readonly appService: UsersService) {
  }

  @Post('registration')
  async registration(@Body() body: any): Promise<any> {
    return await this.appService.registration(body)
  }

  @Post('login')
  async login(@Body() body: any): Promise<any> {
    return await this.appService.login(body)
  }

  @UseGuards(AuthGuard)
  @Get('')
  async getUser(@User() user): Promise<any> {
    return await this.appService.getUser(user)
  }
}
