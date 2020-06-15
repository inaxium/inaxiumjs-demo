import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  create(user:User){
    return this.repo.save(user);
  }

  removeAll(){
    return this.repo.createQueryBuilder().delete().from(User).execute();
  }
}