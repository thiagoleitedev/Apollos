import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { compose, pure, setPropTypes } from 'recompose';
import Color from 'color';

import withTheme from '@primitives/withTheme';
import styled from '@primitives/styled';
import ConnectedImage from '@primitives/ConnectedImage';
import LinearGradient from '@primitives/LinearGradient';
// import FlexedView from '@primitives/FlexedView';

const enhance = compose(
  pure,
  withTheme(),
  setPropTypes({
    source: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        value: PropTypes.string,
        description: PropTypes.string,
      })),
      PropTypes.string,
    ]),
    overlayColor: PropTypes.string,
  }),
);

const Wrapper = styled(({ theme }) => ({
  flex: 1,
  ...Platform.select({
    android: { // fixes android borderRadius overflow display issue
      borderTopRightRadius: theme.cardBorderRadius,
      borderTopLeftRadius: theme.cardBorderRadius,
    },
  }),
}))(View);

const StyledImage = styled(({ theme }) => ({
  width: undefined,
  height: undefined,
  flex: 1,
  resizeMode: 'cover',
  ...Platform.select({
    android: { // fixes android borderRadius overflow display issue
      borderTopRightRadius: theme.cardBorderRadius,
      borderTopLeftRadius: theme.cardBorderRadius,
    },
  }),
}))(ConnectedImage);

const Overlay = styled(({ theme }) => ({
  ...StyleSheet.absoluteFillObject,
  ...Platform.select({
    android: { // fixes android borderRadius overflow display issue
      borderTopRightRadius: theme.cardBorderRadius,
      borderTopLeftRadius: theme.cardBorderRadius,
    },
  }),
}))(LinearGradient);

const CardImage = enhance(({
  source: imageSource,
  overlayColor,
}) => (
  <Wrapper>
    <StyledImage source={imageSource} />
    {overlayColor ? <Overlay colors={[`${Color(overlayColor).fade(1)}`, overlayColor]} start={[0, 0]} end={[0, 1]} locations={[0.3, 1]} /> : null}
  </Wrapper>
));

export default CardImage;