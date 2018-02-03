import { observable, computed } from 'mobx';

import { Prescription } from '../Prescription';

import { environment } from '../../environments/environment';

export enum PrescriptionFormStoreStatus {
  Ready = 1,
  InProgress,
  Success,
  Failure
}

export class PrescriptionFormStore {
  @observable status: PrescriptionFormStoreStatus = PrescriptionFormStoreStatus.Ready;
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

  submit = (event) => {
    event.preventDefault();
    this.asyncSubmit();
  }

  reset = () => {
    this.prescription.reset();
    this.closeResetDialog();
  }

  private async asyncSubmit() {
    this.status = PrescriptionFormStoreStatus.InProgress;

    try {
      const response = await fetch(`${environment.backendApiRoot}/prescriptions.json`,
                                   {
                                     method: 'POST',
                                     headers: {
                                       'Accept': 'application/json',
                                       'Content-Type': 'application/json'
                                     },
                                     body: JSON.stringify(this.prescription.toJSON())
                                   }
                                  );
      this.prescription.id = (await response.json()).id;
      this.status = PrescriptionFormStoreStatus.Success;
    } catch (error) {
      console.log(`PrescriptionFormStore#submit fetch failed: ${error}`);
      this.status = PrescriptionFormStoreStatus.Failure;
    }
  }
}

