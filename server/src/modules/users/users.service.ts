import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { Users } from '../../entities/Users'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateException } from '../../exceptions/nocontent.exception'
import { API_ERROR_CODES } from '../../enum/errorsCodes'
import { generateJwt } from '../../helpers'


@Injectable()
export class UsersService {

  @InjectRepository(Users)
  private usersRepository: Repository<Users>

  async registration({ login, first_name, last_name, password }): Promise<object> {
    const hashPassword = await bcrypt.hash(password, 8)
    const candidateUser = await this.usersRepository.findOne({ where: { login: login } })
    if (candidateUser) throw new CreateException(API_ERROR_CODES.USER_ALREADY_EXISTS)
    const user = await this.usersRepository.create({
      first_name: first_name,
      last_name: last_name,
      login: login,
      role: 'USER',
      password: hashPassword,
    })
    await this.usersRepository.save(user)
    return this.login({ login, password })
  }

  async login({ login, password }): Promise<object> {
    const user = await this.usersRepository.findOne({ where: { login: login } })
    if (!user) throw new CreateException(API_ERROR_CODES.USER_NOT_FOUND)
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new CreateException(API_ERROR_CODES.WRONG_PASSWORD)
    const accessToken = generateJwt({ user_id: user.user_id, role: user.role, })
    const isAdmin = user.role === 'ADMIN'
    return { access_token: accessToken, is_admin: isAdmin }
  }

  async getUser(user): Promise<object> {
    const candidateUser = await this.usersRepository.findOne({ where: { user_id: user.user_id } })
    if (!candidateUser) throw new CreateException(API_ERROR_CODES.USER_NOT_FOUND)
    delete candidateUser.password
    return candidateUser
  }
}
