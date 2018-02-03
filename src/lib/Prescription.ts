import { observable, computed } from 'mobx';

import { Formulation } from './Formulation';
import { Ingredient } from './Ingredient';
import { Patient } from './Patient';
import { PrescriptionIngredient } from './PrescriptionIngredient';
import permCameraMic from 'material-ui/svg-icons/action/perm-camera-mic';

export class Prescription {
  @observable patient: Patient;
  @observable formulation: Formulation | null;
  @observable prescriptionIngredients: PrescriptionIngredient[];

  constructor() {
    this.patient                 = new Patient();
    this.prescriptionIngredients = [];
  }

  @computed get isValid() {
    return this.patient.isValid &&
           this.prescriptionIngredients.map(pi => pi.isValid).reduce(((acc, next) => acc && next), true) &&
           (this.prescriptionIngredients.map(pi => pi.percentage).reduce(((acc, next) => acc + next), 0) <= 100);
  }

  applyFormulation = (formulation: Formulation) => {
    this.formulation = formulation;
    this.prescriptionIngredients = formulation.ingredients.map(ingredient => {
      return new PrescriptionIngredient(ingredient, this, ingredient.percentage);
    });
  }

  addIngredient = (ingredient: Ingredient, percentage: number) => {
    const index = this.ingredientIndex(ingredient);

    if (index === -1) {
      this.prescriptionIngredients.push(new PrescriptionIngredient(ingredient, this, percentage));
    }
  }

  removeIngredient = (ingredient: Ingredient) => {
    const index = this.ingredientIndex(ingredient);

    if (index > -1) {
      this.prescriptionIngredients.splice(index, 1);
    }
  }

  ingredientIndex = (ingredient: Ingredient) => {
    return this.prescriptionIngredients.findIndex((prescriptionIngredient, index) => prescriptionIngredient.ingredientId === ingredient.id);
  }

  reset = () => {
    this.formulation             = null;
    this.prescriptionIngredients = [];

    this.patient.reset();
  }
}
