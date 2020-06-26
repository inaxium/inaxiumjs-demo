import {Entity, Column, PrimaryGeneratedColumn, Double} from 'typeorm';

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    iso: string;

    @Column()
    name: string;

    @Column()
    nicename: string;

    @Column()
    iso3: string;

    @Column()
    numcode: number;

    @Column()
    phonecode: number;

}