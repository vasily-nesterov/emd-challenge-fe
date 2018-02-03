import { observable, computed } from 'mobx';

import { Ingredient } from './Ingredient';

export class Formulation {
  @observable id: number;
  @observable name: string;
  @observable createdAt: Date;
  @observable updatedAt: Date;
  @observable ingredients: Ingredient[];

  constructor(params: any) {
    this.id        = params.id;
    this.name      = params.name;
    this.createdAt = params.created_at;
    this.updatedAt = params.updated_at;

    this.ingredients = params.ingredients.map(ingredientParams => new Ingredient(ingredientParams));
  }
}
