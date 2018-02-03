import * as React from 'react';
import { observer } from 'mobx-react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { Prescription } from '../lib/Prescription';
import { PrescriptionIngredient } from '../lib/PrescriptionIngredient';
import { Store } from '../lib/Store';

import { PrescriptionFormStore } from '../lib/stores/PrescriptionFormStore';

import { IngredientCard } from './IngredientCard';

export const AddIngredientDialog = observer((props: any) => {
  const store: Store = props.store;
  const prescriptionFormStore: PrescriptionFormStore = store.prescriptionFormStore;
  const prescription: Prescription = prescriptionFormStore.prescription;

  const dialogActions = [
    <FlatButton key={1} label="Cancel" primary={true} onClick={prescriptionFormStore.closeAddIngredientDialog} />
  ];

  const unusedIngredientCards = store.ingredients.filter(i => prescription.ingredientIndex(i) === -1).map((ingredient) => {
    const prescriptionIngredient = new PrescriptionIngredient(ingredient, null, ingredient.minimumPercentage);

    return (
            <IngredientCard
              key={ingredient.id}
              ingredient={ingredient}
              prescription={prescriptionFormStore.prescription}
              prescriptionIngredient={prescriptionIngredient}
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
        {unusedIngredientCards}
      </div>
    </Dialog>
  );
});
