//@ts-nocheck
import SearchAPI from 'youtube-search-api';
import ytdl from 'react-native-ytdl';

import {IYTSearchResulsts} from './yt-types';
export async function GetVideoDetails(query: string) {
  const SearchResults: IYTSearchResulsts = await SearchAPI.GetListByKeyword(
    query,
  );
  let obj = SearchResults.items[0];
  let video = await ytdl(obj.id, {quality: 'highestaudio'});
  obj.streams = video;
  return obj;
}
