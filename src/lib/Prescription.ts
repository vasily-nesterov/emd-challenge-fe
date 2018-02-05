import { observable, computed } from 'mobx';

import { Formulation } from './Formulation';
import { Ingredient } from './Ingredient';
import { Patient } from './Patient';
import { PrescriptionIngredient } from './PrescriptionIngredient';

import { environment } from '../environments/environment';

export class Prescription {
  @observable id: number | null;
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

  @computed get isSubmitted(): boolean {
    return !!this.id;
  }

  get pdfUrl(): string {
    return `${environment.backendHost}/prescriptions/${this.id}.pdf`;
  }

  toJSON = () => {
    return {
      prescription: {
        patient_name:       this.patient.name,
        patient_address:    this.patient.address,
        patient_birth_date: this.patient.birthDate,
        formulation_id:     (this.formulation && this.formulation.id),

        ingredients_prescriptions_attributes: this.prescriptionIngredients.map(pi => pi.toJSON())
      }
    };
  }

  applyFormulation = (formulation: Formulation) => {
    this.formulation = formulation;
    this.prescriptionIngredients = formulation.ingredients.map(ingredient => {
      console.log(ingredient);
      return new PrescriptionIngredient(ingredient, this, ingredient.percentage);
    });
  }

  hasIngredient = (ingredient: Ingredient) => {
    return (this.ingredientIndex(ingredient) > -1);
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

  downloadPDF = () => {
    window.open(this.pdfUrl, `_blank`);
  }

  reset = () => {
    this.formulation             = null;
    this.prescriptionIngredients = [];

    this.patient.reset();
  }
}
