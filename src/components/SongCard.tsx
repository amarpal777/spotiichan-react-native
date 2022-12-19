//@ts-nocheck
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

function SongCard({
  navigation,
  song_name,
  song_artist,
  song_image,
}: {
  navigation: any;
  song_name: string;
  song_artist: string;
  song_image: string;
}) {
  const handleClick = () => {
    console.log({song_name, song_artist, song_image})
    navigation.navigate('DownloadPage', {song_name, song_artist, song_image});
  };
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.container}>
        <Image
          style={styles.song_image}
          source={{uri: song_image}}
          resizeMethod="resize"
        />
        <Text style={styles.song_name}>{song_name}</Text>
        <Text style={styles.song_artist}>{song_artist}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  song_image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  song_name: {
    color: '#fff',
    fontFamily: 'GothamBold',
    width: 100,
    fontSize: 17,
  },
  song_artist: {
    marginTop: 5,
    color: '#EAE6E6',
    width: 100,
    fontFamily: 'GothamBold',
  },
});

export default SongCard;
