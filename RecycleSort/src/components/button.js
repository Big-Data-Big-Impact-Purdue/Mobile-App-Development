import React, { Component } from 'react';
import { Button } from 'react-native-elements';

export const PicButton = ({ title, onPress }) => {
  return (
    <Button
      title={title}
      buttonStyle={{ width: 150, height: 100 }}
      onPress={onPress}
    />
  );
};
