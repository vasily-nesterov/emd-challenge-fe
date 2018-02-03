import * as React from 'react';
import { observer } from 'mobx-react';
import * as moment from 'moment';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

import { shouldBeInRangeError } from '../lib/Errors';

import { Ingredient } from '../lib/Ingredient';
import { PrescriptionIngredient } from '../lib/PrescriptionIngredient';
import { Prescription } from '../lib/Prescription';

const styles = {
  card: {
    marginBottom: '20px',
    boxDhadow: 'rgba(0, 0, 0, 1) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
  },
  chip: {
    margin: 4,
    fontSize: '12px',
    lineHeight: '20px'
  },
  wrapper: {
    display: 'flex'
  },
};

export const IngredientCard = observer((props: any) => {
  const prescription: Prescription = props.prescription;
  const ingredient: Ingredient = props.ingredient;
  const prescriptionIngredient: PrescriptionIngredient = props.prescriptionIngredient;

  const ingredientClassesList = ingredient.classes.map((klass, index) => {
    return (<Chip key={index} style={styles.chip}>{klass}</Chip>);
  });

  var cardButton: JSX.Element;

  if (prescriptionIngredient.isInUse) {
    cardButton = <RaisedButton label="Remove" onClick={_event => prescription.removeIngredient(ingredient)} />;
  } else {
    cardButton = <RaisedButton label="Add" onClick={_event => prescription.addIngredient(ingredient, prescriptionIngredient.percentage)} />;
  }

  return (
    <Card style={styles.card}>
      <CardTitle title={ingredient.name} subtitle={<div style={styles.wrapper}>{ingredientClassesList}</div>}/>

      <CardText>
        {ingredient.description}

        <TextField
          hintText="Ingredient Percentage"
          floatingLabelText="Percentage"
          name="ingredientPercentage"
          fullWidth={true}
          value={prescriptionIngredient.percentage}
          onChange={(event) => prescriptionIngredient.percentage = Number((event.target as HTMLInputElement).value)}
          errorText={shouldBeInRangeError(prescriptionIngredient.percentage, ingredient.minimumPercentage, ingredient.maximumPercentage)}
        />

        <Slider
          min={ingredient.minimumPercentage}
          max={ingredient.maximumPercentage}
          value={prescriptionIngredient.percentage}
          onChange={(event, newPercentage) => prescriptionIngredient.percentage = newPercentage}
        />
      </CardText>

      <CardActions>
        {cardButton}
      </CardActions>
    </Card>
  );
});
