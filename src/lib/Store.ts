import { observable, computed } from 'mobx';

import { Ingredient }  from './Ingredient';
import { Formulation } from './Formulation';

import { PrescriptionFormStore } from './stores/PrescriptionFormStore';

import { environment } from '../environments/environment';
import { Prescription } from './Prescription';

enum StoreStatus {
  Loading = 1,
  Success,
  Failure
}

export class Store {
  @observable prescriptionFormStore: PrescriptionFormStore;

  @observable ingredients: Ingredient[]      = [];
  @observable ingredientsStatus: StoreStatus = StoreStatus.Loading;

  @observable formulations: Formulation[]     = [];
  @observable formulationsStatus: StoreStatus = StoreStatus.Loading;

  constructor() {
    this.prescriptionFormStore = new PrescriptionFormStore();

    this.fetchIngredients();
    this.fetchFormulations();
  }

  @computed get status(): StoreStatus {
    if ((this.ingredientsStatus === StoreStatus.Failure) || (this.formulationsStatus === StoreStatus.Failure)) {
      return StoreStatus.Failure;
    }
    if ((this.ingredientsStatus === StoreStatus.Success) && (this.formulationsStatus === StoreStatus.Success)) {
      return StoreStatus.Success;
    }

    return StoreStatus.Loading;
  }

  private async fetchIngredients() {
    try {
      const response = await fetch(`${environment.backendApiRoot}/ingredients.json`);

      this.ingredients       = (await response.json()).map(x => new Ingredient(x));
      this.ingredientsStatus = StoreStatus.Success;
    } catch (error) {
      console.log(`Ingredients fetch failed: ${error}`);
      this.ingredientsStatus = StoreStatus.Failure;
    }
  }

  private async fetchFormulations() {
    try {
      const response = await fetch(`${environment.backendApiRoot}/formulations.json`);

      this.formulations       = await response.json();
      this.formulationsStatus = StoreStatus.Success;
    } catch (error) {
      console.log(`Formulations fetch failed: ${error}`);
      this.formulationsStatus = StoreStatus.Failure;
    }
  }
}
