import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
} from 'react-native';

/**
 * Display a Thing
 * @author [Marcelo Reyna](github.com/Lepozepo)
 * @version 1.0.0
 */
export default class Thing extends Component {
  static propTypes = {
    /**
     * The text to render on this thing
     */
    text: PropTypes.string,
  };

  static defaultProps = {
    text: 'thing'
  };

  render() {
    return (
      <Text>{this.props.text}</Text>
    );
  }
}
