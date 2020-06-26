import { Injectable } from '@nestjs/common';
import {Cron} from "@nestjs/schedule";
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import * as faker from 'faker'


@Injectable()
export class CronService {

    constructor(private service: UsersService) {}

    //@Cron('*/30 * * * *')
    initUser() {
        this.service.removeAll().then(() => {
            let fn = faker.name, fa = faker.address, fi = faker.internet, fp = faker.phone;

            for (let counter = 0; counter < 100; counter++) {
                if (counter%2 === 0){
                    faker.locale = "en_GB";
                }else {
                    faker.locale = "de";
                }
                const user = new User();

                user.forename = fn.firstName();
                user.surname = fn.lastName();
                user.country = fa.country();
                user.city = fa.city();
                user.postcode = fa.zipCode();
                user.street = fa.streetAddress();
                user.email = fi.email();
                user.home = fi.url();
                user.landline = fp.phoneNumber();
                user.mobile = fp.phoneNumber();
                user.birthday = this.randomDate(new Date(1960, 0, 1), new Date());
                user.annualSalary = Math.floor(Math.random() * (10000000 - 100) + 100) / 100;

                this.service.create(user).then(()=>{}).catch((err)=>{console.log(err)});
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

}
