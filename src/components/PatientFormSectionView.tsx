import * as React from 'react';
import { observer } from 'mobx-react';
import * as moment from 'moment';

import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

import { Patient } from '../lib/Patient';

export const PatientFormSectionView = observer((props: any) => {
  const { patient } = props;

  return (
    <div>
      <h3>Patient</h3>

      <TextField
        hintText="Name"
        fullWidth={true}
        floatingLabelText="Name"
        name="patientName"
        value={patient.name}
        onChange={(event) => patient.name = (event.target as HTMLInputElement).value}
      />
      <TextField
        hintText="Address"
        fullWidth={true}
        floatingLabelText="Address"
        name="patientAddress"
        value={patient.address}
        onChange={(event) => patient.address = (event.target as HTMLInputElement).value}
      />
      <DatePicker
        hintText="Date of Birth"
        fullWidth={true}
        floatingLabelText="Date of Birth"
        name="patientBirthDate"
        value={patient.birthDate}
        formatDate={date => moment(date).format(`DD/MM/YYYY`)}
        onChange={(_null, date) => patient.birthDate = date}
      />
    </div>
  );
});
