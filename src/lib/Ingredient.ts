import { observable, computed } from 'mobx';

export class Ingredient {
  @observable id: number;
  @observable name: string;
  @observable minimumPercentage: number;
  @observable maximumPercentage: number;
  @observable description: string;
  @observable classes: string[];
  @observable createdAt: Date;
  @observable updatedAt: Date;

  constructor(params: any) {
    this.id                = params.id;
    this.name              = params.name;
    this.minimumPercentage = params.minimum_percentage;
    this.maximumPercentage = params.maximum_percentage;
    this.description       = params.description;
    this.classes           = params.classes;
    this.createdAt         = params.created_at;
    this.updatedAt         = params.updated_at;
  }
}
