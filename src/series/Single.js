import React from 'react';
import { compose, mapProps, pure } from 'recompose';
import { ScrollView } from 'react-native';
import FlexedView from '@ui/FlexedView';
import Header from '@ui/Header';
import ContentView from '@ui/ContentView';
import SecondaryNav, { Link } from '@ui/SecondaryNav';
import withSeriesContent from '@data/withSeriesContent';
import { withThemeMixin } from '@ui/theme';

const enhance = compose(
  pure,
  mapProps(({ match: { params: { id } } }) => ({ id })),
  withSeriesContent,
  withThemeMixin(({ content: { content = {} } = {} } = {}) => {
    const theme = {
      type: content.isLight ? 'light' : 'dark',
    };
    if (content.colors && content.colors.length) {
      const primary = `#${content.colors[0].value}`;
      theme.colors = {
        background: {
          default: primary,
          primary,
        },
      };
    }
    return theme;
  }),
);

const SeriesSingle = enhance(({
  content: {
    content: {
      isLight = true,
      images = [],
      description,
    } = {},
  } = { },
}) => (
  <FlexedView>
    <Header titleText="Series" backButton barStyle={isLight ? 'dark-content' : 'light-content'} />
    <ScrollView>
      <ContentView images={images} body={description} />
    </ScrollView>
    <SecondaryNav>
      <Link icon="share" />
      <Link icon="like" />
    </SecondaryNav>
  </FlexedView>
));
export default SeriesSingle;
