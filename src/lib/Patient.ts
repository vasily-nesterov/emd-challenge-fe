import { observable, computed } from 'mobx';

export class Patient {
  @observable name: string = ``;
  @observable nameValidationError: boolean = false;

  @observable address: string = ``;
  @observable addressValidationError: boolean = false;

  @observable birthDate: Date | null;
  @observable birthDateValidationError: boolean = false;

  @computed get isValid() {
    return !!this.name && !!this.address && !!this.birthDate;
  }

  setName = (newName: string) => {
    this.name = newName;

    if (!newName) {
      this.nameValidationError = true;
    }
  }

  setAddress = (newAddress: string) => {
    this.address = newAddress;

    if (!newAddress) {
      this.addressValidationError = true;
    }
  }

  setBirthDate = (newBirthDate: Date) => {
    this.birthDate = newBirthDate;

    if (!newBirthDate) {
      this.birthDateValidationError = true;
    }
  }

  reset = () => {
    this.name      = '';
    this.address   = '';
    this.birthDate = null;

    this.nameValidationError      = false;
    this.addressValidationError   = false;
    this.birthDateValidationError = false;
  }
}
