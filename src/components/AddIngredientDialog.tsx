import * as React from 'react';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import { Prescription } from '../lib/Prescription';
import { PrescriptionIngredient } from '../lib/PrescriptionIngredient';
import { Store } from '../lib/Store';

import { PrescriptionFormStore } from '../lib/stores/PrescriptionFormStore';

import { IngredientCard } from './IngredientCard';

export class SearchString {
  @observable value: string = ``;

  @computed get sanitizedValue(): string {
    return this.value.trim().toLowerCase();
  }

  matches = (str: String): boolean => {
    const downcasedStr = str.toLowerCase();

    if (!this.sanitizedValue) {
      return true;
    } else {
      return (downcasedStr.search(this.sanitizedValue) >= 0);
    }
  }
}

const searchString = new SearchString();

export const AddIngredientDialog = observer((props: any) => {
  const store: Store = props.store;
  const prescriptionFormStore: PrescriptionFormStore = store.prescriptionFormStore;
  const prescription: Prescription = prescriptionFormStore.prescription;

  const availableIngredients = store.ingredients
                                    .filter(i => !prescription.hasIngredient(i))
                                    .filter(i => searchString.matches(i.name));

  const dialogActions = [
    <FlatButton key={1} label="Back" primary={true} onClick={prescriptionFormStore.closeAddIngredientDialog} />
  ];

  const ingredientCards = availableIngredients.map((ingredient) => {
    return (
      <IngredientCard
        key={ingredient.id}
        ingredient={ingredient}
        prescription={prescriptionFormStore.prescription}
        prescriptionIngredient={new PrescriptionIngredient(ingredient, null, ingredient.minimumPercentage)}
      />
    );
  });

  return (
    <Dialog
      title="Add Ingredients"
      autoScrollBodyContent={true}
      actions={dialogActions}
      modal={false}
      open={prescriptionFormStore.isAddIngredientDialogOpen}
      onRequestClose={prescriptionFormStore.closeAddIngredientDialog}
    >
      <div>
        <TextField
          hintText="Search ingredients"
          fullWidth={true}
          value={searchString.value}
          onChange={(event) => searchString.value = (event.target as HTMLInputElement).value}
        />

        {ingredientCards}
      </div>
    </Dialog>
  );
});
