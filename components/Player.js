import React, { useContext, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import PlayContext from "../store/PlayButtonContext";

import { useSession } from "next-auth/react";
const Player = () => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const { play, changePlay, playTrack, changeTrack } = useContext(PlayContext);

  useEffect(() => {
    if (!accessToken) return;
  }, [accessToken]);

  useEffect(() => {
    if (play) {
      changePlay(true);
    }
  }, [playTrack]);

  return (
    <SpotifyPlayer
      styles={{
        activeColor: "#fff",
        bgColor: "#181818",
        color: "#fff",
        loaderColor: "#fff",
        sliderColor: "#1cb954",
        trackArtistColor: "#ccc",
        trackNameColor: "#fff",
        height: "70px",
        sliderTrackColor: "#535353",
        sliderTrackBorderRadius: "4px",
        sliderHandleColor: "#fff",
        errorColor: "#fff",
      }}
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        changePlay(state.isPlaying);
      }}
      play={play}
      uris={playTrack?.uri ? [playTrack?.uri] : []}
      magnifySliderOnHover={true}
      autoPlay={true}
    />
  );
};

export default Player;
