// Ao omitir, se torna public. Export faz ser visível em todo o projeto

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('category')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 60, nullable: false})
    name: string;

    @Column({type: 'boolean', default: true})
    active: boolean;
}