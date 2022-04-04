import React, { useContext } from "react";
import PlayContext from "../store/PlayButtonContext";

const RecentlyPlayed = ({ track }) => {
  const { play, changePlay, playTrack, changeTrack } = useContext(PlayContext);
  const handleTrack = () => {
    if (track.uri === playTrack?.uri) {
      changePlay(!play);
      return;
    }
    changeTrack(track);
    changePlay(true);
  };
  return (
    <div className="flex items-center space-x-3" onClick={handleTrack}>
      <img
        src={track.albumUrl}
        alt={track.title}
        className="rounded-full h-[54px] w-[54px] "
      />
      <div>
        <h4 className="max-w-[150px] truncate text-white text-[13px] hover:underline font-semibold cursor-pointer">
          {track.title}
        </h4>
        <p className="text-[#686868] hover:underline font-semibold cursor-pointer">
          {track.artist}
        </p>
      </div>
    </div>
  );
};

export default RecentlyPlayed;
