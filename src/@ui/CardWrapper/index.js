import React from 'react';
import { Platform, View } from 'react-native';
import { compose, pure, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';
import styled from '@ui/styled';

const enhance = compose(
  pure,
  setPropTypes({
    backgroundColor: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.any, // eslint-disable-line
  }),
);

const StyledCard = styled(({ theme, cardColor }) => ({
  width: '100%',
  backgroundColor: cardColor || theme.colors.background.default,
  borderRadius: theme.sizing.borderRadius,
  ...Platform.select(theme.shadows.default),
}))(View);

/*
 * Overflow on iOS, when declared on the same element as a shadow, clips the shadow so overflow must
 * live on a child wrapper. https://github.com/facebook/react-native/issues/449
 */
const OverflowFix = styled(({ theme }) => ({
  borderRadius: theme.sizing.borderRadius,
  overflow: 'hidden',
}))(View);

const CardWrapper = enhance(({
  children,
  backgroundColor,
  style: styleProp = {},
  ...otherProps
}) => (
  <StyledCard
    cardColor={backgroundColor}
    style={styleProp}
    {...otherProps}
  >
    <OverflowFix>
      {children}
    </OverflowFix>
  </StyledCard>
));

export default CardWrapper;
