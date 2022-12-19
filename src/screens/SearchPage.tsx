import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, TextInput} from 'react-native';
import {TouchableWithoutFeedback, Keyboard, View, Image} from 'react-native';
import Spinner from 'react-native-spinkit';
import Toast from 'react-native-toast-message';
import Navbar from '../components/Navbar';
import SongCard from '../components/SongCard';
import {SearchSong} from '../lib/spotify-sdk';
import {ISearchResults} from '../lib/spotifytypes';

function SearchPage({navigation}: {navigation: any}) {
  let [loading, setLoading] = useState(true);

  let [searchResults, setSearchResults] = useState<ISearchResults>();

  useEffect(() => {
    (async () => {
      const serverStat = await fetch('https://oss-spotify.cosii.workers.dev');
      if (serverStat.status === 200) {
        setLoading(false);
        return;
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Spotify-Server is down. Try again later',
        autoHide: false,
        visibilityTime: 10000,
      });
    })();
  }, []);

  const searchSong = async (query: string) => {
    console.log('[SearchPage] searchSong: ', query);
    const songDetails = await SearchSong(query);
    setSearchResults(songDetails);
  };
  return (
    <View>
      {loading ? (
        <View style={styles.loading_cont}>
          <Spinner type="Wave" color="#1DB954" isVisible={true} size={50} />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View >
            <Navbar />
            <Text style={styles.search_text_heading}>Search</Text>

            <View style={styles.search_bar_cont}>
              <Image
                source={require('../../assets/imgs/search_icon.png')}
                style={styles.search_icon}
              />
              <TextInput
                placeholder="Search Song..."
                style={styles.search_input}
                placeholderTextColor="#9F9F9F"
                onSubmitEditing={e => searchSong(e.nativeEvent.text)}
              />
            </View>
            <View style={styles.search_grid}>
              <FlatList
                ListFooterComponent={<View style={{height: 500}} />}
                //@ts-ignore
                data={searchResults?.tracks.items}
                renderItem={({item}) => (
                  <SongCard
                    navigation={navigation}
                    song_image={item.album.images[0].url}
                    key={item.id}
                    song_artist={item.artists[0].name}
                    song_name={item.name}
                  />
                )}
                columnWrapperStyle={{
                  justifyContent: 'space-around',
                  marginBottom: 20,
                }}
                numColumns={3}
              />
            </View>

          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  loading_cont: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  search_text_heading: {
    fontSize: 30,
    fontFamily: 'GothamBold',
    color: '#fff',
    marginLeft: 20,
  },
  search_bar_cont: {
    display: 'flex',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    borderBottomWidth: 1,
    width: '90%',
    borderBottomColor: '#B3B3B3',
  },
  search_icon: {
    width: 20,
    height: 20,
  },
  search_input: {
    color: '#fff',
  },
  search_grid: {
    width: '100%',
    padding: 20,
  },
});

export default SearchPage;
