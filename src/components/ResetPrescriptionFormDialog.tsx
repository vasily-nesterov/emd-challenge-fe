import * as React from 'react';
import { observer } from 'mobx-react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { PrescriptionFormStore } from '../lib/stores/PrescriptionFormStore';

export const ResetPrescriptionFormDialog = observer((props: any) => {
  const prescriptionFormStore: PrescriptionFormStore = props.prescriptionFormStore;

  const dialogActions = [
    <FlatButton label="Cancel" key={1} primary={true} onClick={prescriptionFormStore.closeResetDialog} />,
    <FlatButton label="Reset"  key={2} primary={true} keyboardFocused={true} onClick={prescriptionFormStore.reset} />
  ];

  return (
    <Dialog
      title="Reset Form"
      actions={dialogActions}
      modal={false}
      open={prescriptionFormStore.isResetDialogOpen}
      onRequestClose={prescriptionFormStore.closeResetDialog}
    >

      Are you sure you want to reset the form? All data will be lost!
    </Dialog>
  );
});
