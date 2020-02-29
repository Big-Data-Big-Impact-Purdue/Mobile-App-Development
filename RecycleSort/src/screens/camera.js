import React, { Component, Fragment } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { Camera } from 'expo-camera';

import styles from '../styles/camera-css';

export default class Camera_Page extends Component {
  // TODO: make zoom functionality
  state = {
    hasCameraPermisssion: null,
    cameraType: Camera.Constants.Type.back,
    flashMode: Camera.Constants.FlashMode.off
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

  handleFlash = () => {
    const { flashMode } = this.state;
    const { on, off } = Camera.Constants.FlashMode;
    this.setState({
      flashMode: flashMode === off ? on : off
    });
  };

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log(photo);
      // TODO: store photo to aws S3
    }
  };

  render() {
    const { hasCameraPermission, cameraType, flashMode } = this.state;
    const { on, off } = Camera.Constants.FlashMode;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Fragment>
          <View>
            <Camera
              style={styles.preview}
              type={cameraType}
              flashMode={flashMode}
              autofocus={Camera.Constants.AutoFocus.on}
              ratio={'16:9'}
              ref={(ref) => {
                this.camera = ref;
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  margin: 20
                }}
              >
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent'
                  }}
                  onPress={() => this.handleFlash()}
                >
                  <Ionicons
                    name={flashMode === on ? 'ios-flash' : 'ios-flash-off'}
                    style={{ color: '#fff', fontSize: 40 }}
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
                    style={{ color: '#fff', fontSize: 40 }}
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
                    style={{ color: '#fff', fontSize: 40 }}
                  />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        </Fragment>
      );
    }
  }
}
