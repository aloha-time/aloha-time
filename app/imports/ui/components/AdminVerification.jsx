import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class AdminVerification extends Component {
  state = { activeItem: 'Organizations' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <Menu tabular>
        <Menu.Item
          name='Organizations'
          active={activeItem === 'Organizations'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='Volunteers'
          active={activeItem === 'Volunteers'}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
