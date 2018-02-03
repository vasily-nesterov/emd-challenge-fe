import { observable, computed } from 'mobx';

export class Patient {
  @observable name: string = ``;
  @observable address: string = ``;
  @observable birthDate: Date | null;

  @computed get isValid() {
    return !!this.name && !!this.address && !!this.birthDate;
  }
}
