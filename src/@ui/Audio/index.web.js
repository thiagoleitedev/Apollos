import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import AudioPlay from './AudioPlay';
import AudioPause from './AudioPause';
import AudioSeeker from './AudioSeeker';

export default class Audio extends Component {
  static Play = AudioPlay;
  static Pause = AudioPause;
  static Seeker = AudioSeeker;

  static propTypes = {
    source: PropTypes.string.isRequired,
    onReady: PropTypes.func,
    onError: PropTypes.func,
    onPlaybackReachedEnd: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func,
    onStop: PropTypes.func,
    onSeek: PropTypes.func,
    onSeeking: PropTypes.func,
    children: PropTypes.node,
  };

  static defaultProps = {
    onReady() {},
    onError() {
      // eslint-disable-next-line no-console
      console.error('Failed to load audio file');
    },
    onPlaybackReachedEnd() {},
    onPlay() {},
    onPause() {},
    onStop() {},
    onSeek() {},
    onSeeking() {},
    children: null,
  };

  static childContextTypes = {
    play: PropTypes.func,
    stop: PropTypes.func,
    pause: PropTypes.func,
    seek: PropTypes.func,
  };

  state = {
    progress: 0,
  };

  getChildContext = () => ({
    play: this.play,
    stop: this.stop,
    pause: this.pause,
    seek: this.seek,
  });

  componentWillMount() {
    this.audioFile = new window.Audio(this.props.source);

    this.audioFile.oncanplaythrough = () => {
      if (!this.isReady) this.props.onReady();
      this.isReady = true;
    };

    this.audioFile.onerror = () => {
      this.props.onError();
    };

    this.audioFile.onended = () => {
      this.props.onPlaybackReachedEnd();
    };

    this.audioFile.onplay = () => {
      this.props.onPlay();
    };

    this.audioFile.onpause = () => {
      this.props.onPause();
    };

    this.createStatusListener();
  }

  componentWillUnmount() {
    this.removeStatusListener();
  }

  get duration() {
    return this.audioFile && this.audioFile.duration;
  }

  positionListener = undefined;
  isReady = false;

  play = () => {
    if (this.isReady) this.audioFile.play();
  }

  pause = () => {
    this.audioFile.pause();
  }

  stop = () => {
    this.audioFile.pause();
    this.audioFile.currentTime = 0;
    this.props.onStop();
  }

  seek = (percentageOfSong) => {
    const positionInSeconds = this.duration * percentageOfSong;
    this.audioFile.currentTime = positionInSeconds;

    const positionInMillis = positionInSeconds * 1000;
    this.props.onSeek(positionInMillis);
  }

  handleSeeking = (percentageOfSong) => {
    const positionInSeconds = this.duration * percentageOfSong;
    const positionInMillis = positionInSeconds * 1000;
    this.props.onSeeking(positionInMillis);
  }

  createStatusListener = () => {
    this.positionListener = setInterval(() => {
      this.setState({
        progress: this.audioFile.currentTime / this.duration,
      });
    }, 200);
  }

  removeStatusListener = () => {
    if (this.positionListener) clearInterval(this.positionListener);
  }

  render() {
    const children = Children.map(this.props.children, child => (
      React.cloneElement(child, {
        progress: this.state.progress,
        seekingHandler: this.handleSeeking,
      })
    ));
    return <View>{children}</View>;
  }
}
