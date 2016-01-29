import DatePicker from 'components/DatePicker/DatePicker.react';
import Field      from 'components/Field/Field.react';
import Fieldset   from 'components/Fieldset/Fieldset.react';
import Label      from 'components/Label/Label.react';
import Option     from 'components/Dropdown/Option.react';
import React      from 'react';

export const component = DatePicker;

class DatePickerDemo extends React.Component {
  constructor() {
    super();
    this.state = { value: null };
  }

  handleChange(newValue) {
    this.setState({ value: newValue });
  }

  render() {
    return (
      <DatePicker value={this.state.value} onChange={this.handleChange.bind(this)} />
    );
  }
}

export const demos = [
  {
    render: () => (
      <div style={{ width: 500, margin: '0 auto' }}>
        <Field
          label={<Label text='When should we deliver the notification?' />}
          input={<DatePickerDemo />} />
      </div>
    )
  }
];
