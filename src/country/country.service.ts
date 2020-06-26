import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountryService extends TypeOrmCrudService<Country> {
  constructor(@InjectRepository(Country) repo) {
    super(repo);
  }

  create(country:Country){
    return this.repo.save(country);
  }

  removeAll(){
    return this.repo.createQueryBuilder().delete().from(Country).execute();
  }
}