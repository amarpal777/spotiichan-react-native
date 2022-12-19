import {ISearchResults} from './spotifytypes';

export async function SearchSong(
  q: string,
): Promise<ISearchResults> {
  const data = await fetch('https://oss-spotify.cosii.workers.dev/query/' + q);
  return data.json();
}


