import * as React from 'react';
import { observer } from 'mobx-react';

import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import Add from 'material-ui/svg-icons/content/add';

import { Prescription } from '../lib/Prescription';
import { PrescriptionFormStore } from '../lib/stores/PrescriptionFormStore';

import { IngredientCard } from './IngredientCard';

export const CreamCompositionFormSectionView = observer((props: any) => {
  const { store } = props;
  const prescriptionFormStore: PrescriptionFormStore = store.prescriptionFormStore;
  const prescription: Prescription = prescriptionFormStore.prescription;

  const formulationMenuItems = store.formulations.map((formulation) => {
    return (<MenuItem key={formulation.id} value={formulation} primaryText={formulation.name} />);
  });

  const ingredientCards = prescription.prescriptionIngredients.map((prescriptionIngredient) => {
    return (
            <IngredientCard
              key={prescriptionIngredient.ingredientId}
              ingredient={prescriptionIngredient.ingredient}
              prescription={prescription}
              prescriptionIngredient={prescriptionIngredient}
            />
           );
  });

  return (
    <div>
      <h3>
        Cream Ingredients

        <IconButton tooltip="Add Ingredient" onClick={prescriptionFormStore.openAddIngredientDialog}>
          <Add/>
        </IconButton>
      </h3>

      <div>
        <SelectField
          floatingLabelText="Formulation"
          fullWidth={true}
          maxHeight={500}
          value={prescription.formulation}
          onChange={(_event, _index, value) => prescription.applyFormulation(value)}
        >
          {formulationMenuItems}
        </SelectField>
      </div>

      <div>
        {ingredientCards}
      </div>
    </div>
  );
});
