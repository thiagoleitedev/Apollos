import React from 'react';
import {
  Platform,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  compose,
  pure,
  setPropTypes,
} from 'recompose';

import withTheme from '@primitives/withTheme';
import styled from '@primitives/styled';
import { H4 } from '@primitives/typography';
import Icon from '@primitives/Icon';
import rem from '@utils/remUnit';

import Category from './Category';

const enhance = compose(
  pure,
  withTheme(),
  setPropTypes({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    cardColor: PropTypes.string,
    style: View.propTypes.style,
  }),
);

const StyledCard = styled(({ theme, cardColor }) => ({
  backgroundColor: !cardColor ? theme.lightPrimaryColor : cardColor,
  borderRadius: theme.cardBorderRadius,
  ...Platform.select({
    ios: {
      shadowColor: theme.lightTertiaryColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 1,
      shadowRadius: 3,
    },
    android: {
      elevation: 3,
    },
  }),
}))(View);

/*
 * Overflow on iOS, when declared on the same element as a shadow, clips the shadow so it must live
 * on a child wrapper. https://github.com/facebook/react-native/issues/449
 */
const OverflowFix = styled(({ theme }) => ({
  flex: 1,
  borderRadius: theme.cardBorderRadius,
  overflow: 'hidden',
}))(View);

const StyledImage = styled(({ theme }) => ({
  flex: 1,
  borderTopRightRadius: theme.cardBorderRadius,
  borderTopLeftRadius: theme.cardBorderRadius,
}))(Image);

const CardTitle = styled(({ theme }) => ({
  paddingTop: theme.baseUnit,
  paddingHorizontal: theme.baseUnit,
}))(H4);

const Footer = styled({
  flexDirection: 'row',
  alignItems: 'center',
})(View);

const LikeButton = styled(({ theme }) => ({
  paddingTop: theme.baseUnit / 2,
  paddingHorizontal: theme.baseUnit,
  paddingBottom: theme.baseUnit,
}))(TouchableOpacity);

const MediaCard = enhance(({
  image: imagePath,
  title,
  category,
  style: styleProp = {},
  theme,
  ...otherProps
}) => (
  <StyledCard
    style={styleProp}
    {...otherProps}
  >
    <OverflowFix>
      <StyledImage source={{ uri: imagePath }} />

      <CardTitle>{title}</CardTitle>

      <Footer>
        <Category type={category} />
        <LikeButton>
          <Icon
            name={'like'}
            size={rem(1.2, theme)}
            fill={theme.baseFontColor}
          />
        </LikeButton>
      </Footer>
    </OverflowFix>
  </StyledCard>
));

export default MediaCard;
