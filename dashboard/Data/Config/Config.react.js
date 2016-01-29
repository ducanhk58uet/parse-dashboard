import { ActionTypes } from 'lib/stores/ConfigStore';
import Button          from 'components/Button/Button.react';
import ConfigDialog    from 'dashboard/Data/Config/ConfigDialog.react';
import EmptyState      from 'components/EmptyState/EmptyState.react';
import Icon            from 'components/Icon/Icon.react';
import { isDate }      from 'lib/DateUtils';
import Parse           from 'parse';
import React           from 'react';
import SidebarAction   from 'components/Sidebar/SidebarAction';
import subscribeTo     from 'lib/subscribeTo';
import TableHeader     from 'components/Table/TableHeader.react';
import TableView       from 'dashboard/TableView.react';
import Toolbar         from 'components/Toolbar/Toolbar.react';

@subscribeTo('Config', 'config')
class Config extends TableView {
  constructor() {
    super();
    this.section = 'Core';
    this.subsection = 'Config';
    this.action = new SidebarAction('Create a parameter', this.createParameter.bind(this));
    this.state = {
      modalOpen: false,
      modalParam: '',
      modalType: 'String',
      modalValue: ''
    };
  }

  componentWillMount() {
    this.props.config.dispatch(ActionTypes.FETCH);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.context !== nextContext) {
      nextProps.config.dispatch(ActionTypes.FETCH);
    }
  }

  renderToolbar() {
    return (
      <Toolbar
        section='Core'
        subsection='Config'>
        <Button color='white' value='Create a parameter' onClick={this.createParameter.bind(this)} />
      </Toolbar>
    );
  }

  renderExtras() {
    if (!this.state.modalOpen) {
      return null;
    }
    return (
      <ConfigDialog
        onConfirm={this.saveParam.bind(this)}
        onCancel={() => this.setState({ modalOpen: false })}
        param={this.state.modalParam}
        type={this.state.modalType}
        value={this.state.modalValue} />
    );
  }

  renderRow(data) {
    let value = data.value;
    let modalValue = value;
    let type = typeof value;
    if (type === 'object') {
      if (isDate(value)) {
        type = 'Date';
        value = value.toISOString();
      } else if (Array.isArray(value)) {
        type = 'Array';
        value = JSON.stringify(value);
        modalValue = value;
      } else if (value instanceof Parse.GeoPoint) {
        type = 'GeoPoint';
        value = `(${value.latitude}, ${value.longitude})`;
        modalValue = data.value.toJSON();
      } else if (value instanceof Parse.File) {
        type = 'File';
        value = <a target='_blank' href={value.url()}>Open in new window</a>;
      } else {
        type = 'Object';
        value = JSON.stringify(value);
        modalValue = value;
      }
    } else {
      if (type === 'boolean') {
        value = value ? 'true' : 'false';
      }
      type = type.substr(0, 1).toUpperCase() + type.substr(1);
    }
    let openModal = () => this.setState({
      modalOpen: true,
      modalParam: data.param,
      modalType: type,
      modalValue: modalValue
    });
    let columnStyle = { width: '30%', cursor: 'pointer' };
    return (
      <tr key={data.param}>
        <td style={columnStyle} onClick={openModal}>{data.param}</td>
        <td style={columnStyle} onClick={openModal}>{type}</td>
        <td style={columnStyle} onClick={openModal}>{value}</td>
        <td style={{ textAlign: 'center' }}>
          <a onClick={this.deleteParam.bind(this, data.param)}>
            <Icon width={16} height={16} name='trash-solid' fill='#ff395e' />
          </a>
        </td>
      </tr>
    );
  }

  renderHeaders() {
    return [
      <TableHeader key='parameter' width={30}>Parameter</TableHeader>,
      <TableHeader key='type' width={30}>Type</TableHeader>,
      <TableHeader key='value' width={30}>Value</TableHeader>
    ];
  }

  renderEmpty() {
    return (
      <EmptyState
        title='Dynamically configure your app'
        description='Set up parameters that let you control the appearance or behavior of your app.'
        icon='gears'
        cta='Create your first parameter'
        action={this.createParameter.bind(this)} />
    );
  }

  tableData() {
    let data = undefined;
    if (this.props.config.data) {
      let params = this.props.config.data.get('params');
      if (params) {
        data = [];
        params.forEach((value, param) => {
          data.push({ param, value });
        });
      }
    }
    return data;
  }

  saveParam({ name, value }) {
    this.props.config.dispatch(
      ActionTypes.SET,
      { param: name, value: value }
    ).then((r) => {
      this.setState({ modalOpen: false });
    }, (error) => {

    });
  }

  deleteParam(name) {
    this.props.config.dispatch(
      ActionTypes.DELETE,
      { param: name }
    )
  }

  createParameter() {
    this.setState({
      modalOpen: true,
      modalParam: '',
      modalType: 'String',
      modalValue: ''
    });
  }
}

export default Config;
