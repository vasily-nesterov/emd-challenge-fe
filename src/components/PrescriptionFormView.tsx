import * as React from 'react';
import { observer } from 'mobx-react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import { Prescription } from '../lib/Prescription';
import { Store } from '../lib/Store';
import { PrescriptionFormStore } from '../lib/stores/PrescriptionFormStore';

import { CreamCompositionFormSectionView } from './CreamCompositionFormSectionView';
import { PatientFormSectionView } from './PatientFormSectionView';

export const PrescriptionFormView = observer((props: any) => {
  const store: Store                                 = props.store;
  const prescriptionFormStore: PrescriptionFormStore = store.prescriptionFormStore;
  const prescription: Prescription                   = prescriptionFormStore.prescription;

  return (
    <Grid>
      <Row center="md">
        <Col xs={12} sm={8} md={6}>
          <form onSubmit={prescriptionFormStore.submit}>
            <div>
              <PatientFormSectionView patient={prescription.patient} />

              <CreamCompositionFormSectionView store={store} />

              <RaisedButton
                label="Submit"
                type="submit"
                fullWidth={true}
                primary={true}
                disabled={!prescription.isValid}
              />
              <RaisedButton
                label="Add Ingredients"
                fullWidth={true}
                labelStyle={{color: 'gray'}}
                onClick={prescriptionFormStore.openAddIngredientDialog}
              />
              <RaisedButton
                label="Reset"
                fullWidth={true}
                labelStyle={{color: 'gray'}}
                onClick={prescriptionFormStore.openResetDialog}
              />
            </div>
          </form>

          <Snackbar
            open={prescription.isSubmitted}
            message={`Prescription #${prescription.id} has been successfully processed`}
            action="DOWNLOAD"
            onActionClick={event => prescription.downloadPDF()}
          />
        </Col>
      </Row>
    </Grid>
  );
});
