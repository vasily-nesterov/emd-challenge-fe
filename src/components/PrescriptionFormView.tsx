import * as React from 'react';
import { observer } from 'mobx-react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

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
          <form>
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
                label="Reset"
                fullWidth={true}
                labelStyle={{color: 'gray'}}
                onClick={prescriptionFormStore.openResetDialog}
              />
            </div>
          </form>
        </Col>
      </Row>
    </Grid>
  );
});
