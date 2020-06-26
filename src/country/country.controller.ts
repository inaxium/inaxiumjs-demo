import { Controller} from '@nestjs/common';
import { Crud} from '@nestjsx/crud';
import { Country } from './country.entity';
import { CountryService } from './country.service';

@Crud({
  model: {
    type: Country,
  },
})

@Controller('country')
export class CountryController {
  constructor(public service: CountryService) {}
}
