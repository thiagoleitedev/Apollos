import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { compose, mapProps } from 'recompose';
import FormInput from '@ui/FormInput';
import withUser from '@data/withUser';

// TODO: Use @primitives
export class ChangePasswordForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit() {},
  };

  state = {
    oldPassword: '',
    newPassword: '',
  };

  handleSubmit = () => {
    const {
      oldPassword,
      newPassword,
    } = this.state;
    const {
      onSubmit,
    } = this.props;

    onSubmit({
      oldPassword,
      newPassword,
    });
  };

  render() {
    return (
      <View>
        <FormInput
          label="Old Password"
          onChangeText={oldPassword => this.setState({ oldPassword })}
          value={this.state.oldPassword}
          secureTextEntry
        />

        <FormInput
          label="New Password"
          onChangeText={newPassword => this.setState({ newPassword })}
          value={this.state.newPassword}
          secureTextEntry
        />

        <TouchableWithoutFeedback
          onPress={this.handleSubmit}
        >
          <View
            style={{
              padding: 10,
              borderColor: 'gray',
              borderWidth: 1,
            }}
          >
            <Text>{'Enter'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const enhance = compose(
  withUser,
  mapProps(props => ({ ...props, onSubmit: props.changePassword })),
);
export default enhance(ChangePasswordForm);
