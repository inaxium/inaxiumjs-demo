import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Lang } from './lang.entity';
import { LangService } from './lang.service';
import { AuthGuard } from '@nestjs/passport';
import {JwtService} from "@nestjs/jwt";

@Crud({
  model: {
    type: Lang,
  }
})

//@UseGuards(AuthGuard('jwt'))
@Controller('lang')
export class LangController {
  constructor(public service: LangService) {}


}
