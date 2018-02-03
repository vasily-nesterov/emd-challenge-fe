import { observable } from 'mobx';

import { Prescription } from '../Prescription';

export class PrescriptionFormStore {
  @observable prescription: Prescription;
  @observable isResetDialogOpen: boolean = false;

  constructor() {
    this.prescription = new Prescription();
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
