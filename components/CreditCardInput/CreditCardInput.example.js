import CreditCardInput from 'components/CreditCardInput/CreditCardInput.react';
import React           from 'react';
import Field           from 'components/Field/Field.react';
import Fieldset        from 'components/Fieldset/Fieldset.react';
import Label           from 'components/Label/Label.react';

class Demo extends React.Component {
  constructor() {
    super();
    this.state = { value: null };
  }

  render() {
    return (
      <CreditCardInput
        value={this.state.value}
        lastFour={this.props.lastFour}
        onChange={(value) => this.setState({ value })} />
    );
  }
}

export const component = CreditCardInput;

export const demos = [
  {
    render: () => (
      <div style={{ width: 500, margin: '0 auto' }}>
        <Field label={<Label text='Empty demo' />} input={<Demo />} />
      </div>
    )
  },
  {
    render: () => (
      <div style={{ width: 500, margin: '0 auto' }}>
        <Field label={<Label text='Prefilled with last four' />} input={<Demo lastFour='1234' />} />
      </div>
    )
  }
];
