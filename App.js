import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImageHandler = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        compressImageQuality: 0.5, // Adjust compression quality as needed
        cropping: true,
        cropperCircleOverlay: false, // Set to true for circular cropping
        width: 300, // Desired width of the cropped image
        height: 300, // Desired height of the cropped image
      });

      setSelectedImage({ uri: image.path });
    } catch (error) {
      console.log('Image selection error:', error);
    }
  };

  const uploadImageHandler = () => {
    // Implement your image upload logic here
    // You can use the "selectedImage.uri" to get the image URI
    console.log('Uploading image:', selectedImage);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button title="Select Image" onPress={selectImageHandler} />
        {selectedImage && <Image source={selectedImage} style={styles.image} />}
        {selectedImage && (
          <Button title="Upload Image" onPress={uploadImageHandler} />
        )}
      </View>
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
