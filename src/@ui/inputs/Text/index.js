import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { compose, withProps, pure } from 'recompose';
import { TextInput, Animated } from 'react-native';

import FloatingLabel from '../FloatingLabel';
import InputUnderline from '../InputUnderline';
import InputWrapper from '../InputWrapper';

import withFocusAnimation from '../withFocusAnimation';
import InputAddon, { AddonRow } from '../InputAddon';
import withInputControlStyles from '../withInputControlStyles';

const StyledTextInput = withInputControlStyles(TextInput);

const propsForInputType = {
  password: {
    secureTextEntry: true,
    autoCapitalize: 'none',
    autoCorrect: false,
  },
  email: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoCorrect: false,
  },
  numeric: {
    keyboardType: 'numeric',
  },
  phone: {
    keyboardType: 'phone-pad',
  },
};

const enhance = compose(
  pure,
  withFocusAnimation,
  withProps(({ type, ...props }) => ({
    ...get(propsForInputType, type, {}),
    ...props,
  })),
);

const Text = enhance(({
  label,
  prefix,
  suffix,
  focusAnimation, // from withFocusAnimation
  ...textInputProps
}) => (
  <InputWrapper>
    <AddonRow>
      <InputAddon>{prefix}</InputAddon>
      <Animated.View style={{ opacity: focusAnimation, flex: 1 }}>
        <StyledTextInput {...textInputProps} />
      </Animated.View>
      <InputAddon>{suffix}</InputAddon>
    </AddonRow>

    <FloatingLabel animation={focusAnimation}>{label}</FloatingLabel>
    <InputUnderline animation={focusAnimation} />
  </InputWrapper>
));

Text.propTypes = {
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  label: PropTypes.string,
};

export default Text;