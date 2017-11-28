import React from 'react';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import MediaCard from './';

storiesOf('@primitives/MediaCard/Component', module)
  .add('Default', () => {
    const centered = {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: '#f7f7f7',
    };

    const cardDimensions = {
      height: 400,
      width: '92%',
    };

    return (
      <View style={centered}>
        <MediaCard
          style={cardDimensions}
          title={'Promised Land'}
          category={'Series'}
          image={'https://picsum.photos/600/400'}
        />
      </View>
    );
  });