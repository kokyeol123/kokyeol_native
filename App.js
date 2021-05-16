import React, { useState, useEffect, useRef } from "react";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Camera } from "expo-camera";
import CameraPermissionsWrapper from './CameraPermissionsWrapper';
import HomeScreen from './components/HomeScreen';

export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [lastPhotoURI, setLastPhotoURI] = useState(null);
  const cameraRef = useRef(null);

  if (lastPhotoURI !== null) {
    return (
      <ImageBackground
        source={{ uri: lastPhotoURI }}
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.2,
            alignSelf: "flex-end",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#666",
            marginBottom: 40,
            marginLeft: 20,
          }}
          onPress={() => {
            setLastPhotoURI(null);
          }}
        >
          <Text style={{ fontSize: 30, padding: 10, color: "white" }}>❌</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
      <CameraPermissionsWrapper>
        <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
          <View
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                flex: 0.2,
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#666",
                marginBottom: 40,
                marginLeft: 20,
              }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={{ fontSize: 30, padding: 10, color: "white" }}>♻</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 0.2,
                alignSelf: "flex-end",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#666",
                marginBottom: 40,
                marginLeft: 20,
              }}
              onPress={async () => {
                if (cameraRef.current) {
                  let photo = await cameraRef.current.takePictureAsync();
                  setLastPhotoURI(photo.uri);
                }
              }}
            >
              <Text style={{ fontSize: 30, padding: 10, color: "white" }}>
                📸
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </CameraPermissionsWrapper>
    </NavigationContainer>
  );
}
