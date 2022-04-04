export function restructureData(track) {
  const newTrack = {
    id: track.id,
    artist: track?.artists[0]?.name,
    title: track?.name,
    uri: track?.uri,
    albumUrl: track?.album?.images[0]?.url || track?.images[0].url,
    popularity: track?.popularity,
  };

  return newTrack;
}
