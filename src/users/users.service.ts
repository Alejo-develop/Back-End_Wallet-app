import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async finOneByEmail(email: string) {
    return await this.userRepository.findOne({where: {email: email}});
  }

  async create(authDto: AuthDto) {
    return await this.userRepository.save(authDto)
  }

  async findUserByEmailWithPassword(email: string){
    return await this.userRepository.findOne({
      where: {email: email},
      select: [
        'id',
        'email',
        'name', 
        'password'
      ]
    })
  }

  async findById(id: string): Promise<User> {
    const userFound = await this.userRepository.findOne({where: {id}})

    if(!userFound) throw new NotFoundException('User not found')

    return userFound
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto){
    const userFound = await this.findById(id)
    return await this.userRepository.save({...userFound, ...updateUserDto})
  }

  async removeUser(id: string){
    await this.findById(id)
    return await this.userRepository.softDelete(id)
  }
}
