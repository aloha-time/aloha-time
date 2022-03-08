import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class AdminSettingsForm extends Component {
  state = { password: '', submittedPassword: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { password } = this.state;

    this.setState({ submittedPassword: password });
  }

  render() {
    const { password, submittedPassword } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              label='Change Password'
              placeholder='password'
              name='password'
              type='password'
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button content='Apply Change' />
        </Form>
      </div>
    );
  }
}

export default AdminSettingsForm;
