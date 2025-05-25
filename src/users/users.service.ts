import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOneByDni(dni: string): Promise<UserEntity | undefined> {
    return this.usersRepository.findOne({ where: { dni } });
  }

  // A method to find user by ID might be useful for JwtStrategy,
  // but the current requirement for JwtStrategy.validate is to return based on payload, not another DB lookup.
  // async findOneById(id: number): Promise<UserEntity | undefined> {
  //   return this.usersRepository.findOne({ where: { id } });
  // }
}
