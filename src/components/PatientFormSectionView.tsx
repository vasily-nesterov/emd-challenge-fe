import * as React from 'react';
import { observer } from 'mobx-react';
import * as moment from 'moment';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import { shouldBePresentError } from '../lib/Errors';
import { Patient } from '../lib/Patient';

export const PatientFormSectionView = observer((props: any) => {
  const { patient } = props;

  return (
    <div>
      <h3>Patient</h3>

      <TextField
        hintText="Name"
        floatingLabelText="Name"
        name="patientName"
        fullWidth={true}
        value={patient.name}
        onChange={(event) => patient.setName((event.target as HTMLInputElement).value)}
        errorText={shouldBePresentError(patient.nameValidationError)}
      />
      <TextField
        hintText="Address"
        floatingLabelText="Address"
        name="patientAddress"
        fullWidth={true}
        value={patient.address}
        onChange={(event) => patient.setAddress((event.target as HTMLInputElement).value)}
        errorText={shouldBePresentError(patient.addressValidationError)}
      />
      <DatePicker
        hintText="Date of Birth"
        floatingLabelText="Date of Birth"
        name="patientBirthDate"
        fullWidth={true}
        value={patient.birthDate}
        formatDate={date => moment(date).format(`DD/MM/YYYY`)}
        onChange={(_null, date) => patient.setBirthDate(date)}
        errorText={shouldBePresentError(patient.birthDateValidationError)}
      />
    </div>
  );
});
