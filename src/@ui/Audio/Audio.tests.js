import React from 'react';
import renderer from 'react-test-renderer';
import { View } from 'react-native';
import { ThemeProvider } from '@ui/theme';
import Icon from '@ui/Icon';
import Audio from './';

it('renders correctly', () => {
  const tree = renderer.create(
    <ThemeProvider>
      <Audio source="https://www.w3schools.com/html/horse.mp3">
        <Audio.Play>
          <View>
            <Icon name="play" />
          </View>
        </Audio.Play>

        <Audio.Pause>
          <View>
            <Icon name="pause" />
          </View>
        </Audio.Pause>

        <Audio.Seeker />
      </Audio>
    </ThemeProvider>,
  );
  // expect(true).toBe(true);
  expect(tree).toMatchSnapshot();
});
