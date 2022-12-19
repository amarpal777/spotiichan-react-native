//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {Linking, TouchableHighlight} from 'react-native';
import {ImageBackground} from 'react-native';
import {Image} from 'react-native';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';
import {GetVideoDetails} from '../lib/youtube';
import {Item} from '../lib/yt-types';
import DownoadManager from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';

function DownloadPage({navigation}: {navigation: any}) {

  let song_name = navigation.getParam('song_name');
  let song_artist = navigation.getParam('song_artist');
  let song_image = navigation.getParam('song_image');
  
  let [loading, setLoading] = useState(true);

  let [downloadDetails, setDownloadDetails] = useState<Item>(null);
  useEffect(() => {
    (async () => {
      let Details = await GetVideoDetails(`${song_name} ${song_artist}`);
      setDownloadDetails(Details);
      setLoading(false);
      console.log('[DownloadPage] Download Details: ', Details);
      if (!Details.streams) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No streams found for this song (Try again later)',
          autoHide: false,
        });
        return;
      }
      console.log('[Streams]: ', Details.streams);
    })();
  }, []);

  const downloadSong = async () => {
    console.log(
      '[DownloadPage] Downloading Song: ',
      downloadDetails.streams[0].url,
    );
    let songNameSaveName = `${song_name} ${song_artist}`.replace(
      /[/\\?%*:|"<>]/g,
      '-',
    );
    Toast.show({
      type: 'info',
      text1: 'Downloading Song',
      autoHide: true,
    });
    DownoadManager.config({
      fileCache: true,
      addAndroidDownloads: {
        description: `Downloading '${song_name}'`,
        notification: true,
        useDownloadManager: true,
        path: `${DownoadManager.fs.dirs.DownloadDir}/${songNameSaveName}.mp3`,
      },
    })
      .fetch('GET', downloadDetails.streams[0].url)
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Downloaded ' + "'"+ song_name + "'",
          autoHide: true,
        });
      });
  };

  const openYouTubeURL = () => {
    let id = downloadDetails.id;
    let url = `https://www.youtube.com/watch?v=${id}`;
    Linking.canOpenURL(`vnd.youtube:${id}`).then(supported => {
      if (supported) {
        Linking.openURL(`vnd.youtube:${id}`).catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Could not open YouTube URL',
            autoHide: false,
          });
        });
      } else {
        Linking.openURL(url).catch(() => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Could not open YouTube URL',
            autoHide: false,
          });
        });
      }
    });
  };

  return (
    <ImageBackground
      source={{
        uri: song_image,
      }}
      style={{width: '100%', height: '100%'}}
      imageStyle={{
        opacity: 0.19,
      }}>
      <View>
        <ScrollView>
          <View style={styles.navbar}>
            <TouchableHighlight
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                style={styles.back_icon}
                source={require('../../assets/imgs/backicon.png')}
                resizeMode="contain"
              />
            </TouchableHighlight>
            <Text style={styles.top_download_text}> Download</Text>
          </View>
          <View style={styles.main_cont}>
            <Image
              style={{height: 200, width: 200, borderRadius: 10}}
              source={{uri: song_image}}
              resizeMode="contain"
            />
            <Text style={styles.song_artist}>{song_artist}</Text>
            <Text style={styles.song_name}>{song_name}</Text>
          </View>
          <View>
            {loading ? (
              <View style={styles.yt_loading}>
                <Spinner type="Wave" color="#1DB954" />
              </View>
            ) : (
              <View>
                <View style={styles.yt_cont}>
                  <Image
                    source={{
                      uri: downloadDetails.thumbnail.thumbnails[0].url,
                    }}
                    resizeMode="contain"
                    style={styles.yt_thumb}
                  />
                  <Text style={styles.yt_title}>{downloadDetails.title}</Text>
                </View>
                <View style={styles.btn_cont}>
                  <TouchableHighlight
                    style={styles.listen_btn}
                    onPress={openYouTubeURL}>
                    <View>
                      <Text style={styles.listen_text}>Listen</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.download_btn}
                    onPress={downloadSong}>
                    <View>
                      <Text style={styles.download_text}>Download</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            )}
            <Text style={{
              textAlign: 'center',
              margin: 20,
              marginTop: 40,
              fontFamily: 'GothamBook',
              color: '#797979',
              fontSize: 12,
            }}>Copyright belongs to original artist of song, please support artists by buying their music</Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
    alignItems: 'center',
    width: '100%',
  },
  back_icon: {
    height: 20,
    width: 20,
  },
  top_download_text: {
    fontSize: 12,
    fontFamily: 'GothamBold',
    color: '#fff',
    marginLeft: 120,
  },
  main_cont: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  song_artist: {
    marginTop: 5,
    fontFamily: 'Gotham',
    color: '#EAE6E6',
  },
  song_name: {
    color: '#1DB954',
    fontFamily: 'GothamBold',
    fontSize: 30,
    textAlign: 'center',
    width: '90%',
  },
  yt_cont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 50,
    marginLeft: 20,
  },
  yt_thumb: {
    height: 80,
    aspectRatio: 16 / 9,
  },
  yt_loading: {
    marginTop: 50,
    marginLeft: 165,
  },
  yt_title: {
    color: '#fff',
    fontFamily: 'GothamBold',
    fontSize: 12,
    marginLeft: 30,
    width: 200,
  },
  btn_cont: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: 25,
  },
  listen_btn: {
    backgroundColor: 'rgba(179, 179, 179, 0.4)',
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    opacity: 0.8,
  },
  listen_text: {
    fontFamily: 'GothamBold',
    color: '#fff',
    fontSize: 16,
  },
  download_btn: {
    marginTop: 10,
    backgroundColor: 'rgba(29, 185, 84, 0.5)',
    width: '80%',
    display: 'flex',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    opacity: 0.8,
  },
  download_text: {
    fontFamily: 'GothamBold',
    color: '#fff',
    fontSize: 16,
  },
});

export default DownloadPage;
