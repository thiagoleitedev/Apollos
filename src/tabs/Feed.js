import React from 'react';
import { pure, compose } from 'recompose';
import Header from '@ui/Header';
import FeedView from '@ui/FeedView';
import FlexedView from '@ui/FlexedView';
import withHomeFeed from '@data/withHomeFeed';

const FeedViewWithHomeFeed = withHomeFeed(FeedView);

const enhance = compose(
  pure,
);

const Feed = enhance(() => (
  <FlexedView>
    <Header titleText="NewSpring Church" />
    <FeedViewWithHomeFeed />
  </FlexedView>
));

export default Feed;
