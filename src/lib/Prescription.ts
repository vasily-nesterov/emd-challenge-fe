import { observable, computed } from 'mobx';

import { Patient } from './Patient';

export class Prescription {
  @observable patient: Patient;

  constructor() {
    this.patient = new Patient();
  }

  @computed get isValid() {
    return this.patient.isValid;
  }

  public reset() {
    this.patient.reset();
  }
}
