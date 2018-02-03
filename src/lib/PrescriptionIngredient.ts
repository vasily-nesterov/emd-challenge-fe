import { observable, computed } from 'mobx';

import { Ingredient } from './Ingredient';
import { Prescription } from './Prescription';

export class PrescriptionIngredient {
  @observable ingredient: Ingredient;
  @observable prescription: Prescription | null;
  @observable percentage: number;

  constructor(ingredient: Ingredient, prescription: Prescription | null, percentage: number) {
    this.ingredient   = ingredient;
    this.prescription = prescription;
    this.percentage   = percentage;
  }

  @computed get isValid(): boolean {
    console.log(this.percentage, this.ingredient.minimumPercentage, this.ingredient.maximumPercentage);
    return ((this.percentage >= this.ingredient.minimumPercentage) && (this.percentage <= this.ingredient.maximumPercentage));
  }

  toJSON = () => {
    return {
      ingredient_id: this.ingredient.id,
      percentage:    this.percentage
    };
  }

  get ingredientId(): number {
    return (this.ingredient && this.ingredient.id);
  }

  get isInUse(): boolean {
    return (!!this.prescription);
  }
}
