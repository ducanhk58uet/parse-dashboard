import React  from 'react';
import Field from 'components/Field/Field.react';
import Fieldset from 'components/Fieldset/Fieldset.react';
import FormButton from 'components/FormButton/FormButton.react';
import Label from 'components/Label/Label.react';

export const component = FormButton;

export const demos = [
  {
    render: () => (
      <Fieldset legend='Form Buttons'>
        <Field
          label={<Label text='Cool button' description='It does something.' />}
          input={<FormButton value='Do something cool' />} />
        <Field
          label={<Label text='Danger danger' description='This will delete everything.' />}
          input={<FormButton color='red' value='Break it all' />} />
      </Fieldset>
    )
  }
];
