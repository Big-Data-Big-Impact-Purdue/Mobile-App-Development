import React, { Component } from "react";
import { Button } from "react-native-elements";

const button = props => {
  return <Button title={props.title} onPress={props.onPress}></Button>;
};

export default button;
