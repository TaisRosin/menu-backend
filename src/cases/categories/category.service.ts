import { Repository } from "typeorm";
import { Category } from "./category.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class CategoryService {

    constructor( @InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {

    }

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find();
    }

    findOne(): Promise<Category> {

    }

    create(): Promise<Category> {

    }

    update(): Promise<Category> {

    }

    remove(): Promise<void> {

    }

}