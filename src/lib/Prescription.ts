import { observable, computed } from 'mobx';

import { Patient } from './Patient';
import { Store } from './Store';

export class Prescription {
  @observable patient: Patient;

  constructor(store: Store) {
    this.patient = new Patient();
  }

  @computed get isValid() {
    return this.patient.isValid;
  }
}
