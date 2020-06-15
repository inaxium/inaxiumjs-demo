import { Entity, Column, PrimaryGeneratedColumn  } from 'typeorm';

@Entity()
export class Lang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  match: string;

  @Column()
  en: string;

  @Column()
  de: string;

}