import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Lang } from './lang.entity';

@Injectable()
export class LangService extends TypeOrmCrudService<Lang> {
  constructor(@InjectRepository(Lang) repo) {
    super(repo);
  }


}
