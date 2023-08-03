import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImageHandler = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to select an image.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          ImagePicker.showImagePicker({}, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              setSelectedImage({ uri: response.uri });
            }
          });
        } else {
          console.log('Storage permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else if (Platform.OS === 'ios') {
      ImagePickerIOS.openSelectDialog({}, (imageUri) => {
        if (imageUri) {
          setSelectedImage({ uri: imageUri });
        } else {
          console.log('User cancelled image selection');
        }
      }, (error) => {
        console.log('ImagePickerIOS Error: ', error);
      });
    }
  };
  

  const uploadImageHandler = async () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage.uri,
        name: 'image.jpg',
        type: 'image/jpg',
      });

      try {
        const response = await fetch('YOUR_IMAGE_UPLOAD_API_URL', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const responseData = await response.json();
        console.log('Image uploaded successfully!', responseData);
        // Handle success
      } catch (error) {
        console.log('Image upload failed.', error);
        // Handle error
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Image" onPress={selectImageHandler} />
      {selectedImage && (
        <View>
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
          <Button title="Upload Image" onPress={uploadImageHandler} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
});

export default App;
