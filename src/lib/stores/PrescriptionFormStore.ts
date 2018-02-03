import { observable } from 'mobx';

import { Prescription } from '../Prescription';

export class PrescriptionFormStore {
  @observable prescription: Prescription;

  @observable isResetDialogOpen: boolean         = false;
  @observable isAddIngredientDialogOpen: boolean = false;

  constructor() {
    this.prescription = new Prescription();
  }

  openAddIngredientDialog = () => {
    this.isAddIngredientDialogOpen = true;
  }

  closeAddIngredientDialog = () => {
    this.isAddIngredientDialogOpen = false;
  }

  openResetDialog = () => {
    this.isResetDialogOpen = true;
  }

  closeResetDialog = () => {
    this.isResetDialogOpen = false;
  }

 reset = () => {
    this.prescription.reset();
    this.closeResetDialog();
  }
}
