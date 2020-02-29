import React, { Component, Fragment } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { Camera } from 'expo-camera';

export default class Camera_Page extends Component {
  // TODO: Create Camera functionality and save pictures to database locally
  state = {
    hasCameraPermisssion: null,
    cameraType: Camera.Constants.Type.back
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };

  takePicture = async () => {
    console.log('sice');
    if (this.camera) {
      let photo = await this.cameraRef.current.takePictureAsync();
      console.log(photo);
    }
  };

  onPictureSaved = (photo) => {
    console.log(photo);
  };

  render() {
    const { hasCameraPermission, cameraType } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Fragment>
          <View style={{ flex: 1 }}>
            <Camera
              style={{ flex: 10 }}
              type={cameraType}
              ref={(ref) => {
                this.camera = ref;
              }}
            ></Camera>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 20
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
                }}
              >
                <Ionicons
                  name="ios-photos"
                  style={{ color: '#111', fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
                }}
                onPress={() => this.takePicture()}
              >
                <FontAwesome
                  name="camera"
                  style={{ color: '#111', fontSize: 40 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
                }}
                onPress={() => this.handleCameraType()}
              >
                <MaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: '#111', fontSize: 40 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Fragment>
      );
    }
  }
}
