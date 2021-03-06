import {Entity, Column, PrimaryGeneratedColumn, Double} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    forename: string;

    @Column()
    surname: string;

    @Column()
    country: string;

    @Column()
    city: string;

    @Column()
    postcode: string;

    @Column()
    street: string;

    @Column()
    email: string;

    @Column()
    home: string;

    @Column()
    mobile: string;

    @Column()
    landline: string;

    @Column()
    birthday: Date;

    @Column({ name: "annual_salary", type:"double" })
    annualSalary: Double;

}