import Image from "next/image";
import React from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { useContext } from "react";
import PlayContext from "../store/PlayButtonContext";
const Poster = ({ track }) => {
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
    <div
      className="h-[360px] w-[260px] rounded-[50px] text-white/80 relative cursor-pointer hover:scale-105 hover:text-w/100 transition duration-250 ease-out overflow-hidden group"
      onClick={handleTrack}
    >
      <img
        src={track.albumUrl}
        alt={track.name}
        className="h-full w-full object-cover absolute inset-0 opacity-80 group-hover:opacity-100"
      />
      <div className="absolute bottom-10 ml-4 inset-x-0 flex items-center space-x-3">
        <div className="rounded-full bg-[#15883e] h-10 w-10 flex items-center justify-center group-hover:bg-[#1db954]">
          {play && playTrack?.uri === track.uri ? (
            <BsFillPauseFill className="text-xl text-white" />
          ) : (
            <BsFillPlayFill className="text-xl text-white" />
          )}
        </div>
        <div className="text-[15px]">
          <h4 className="w-44 truncate font-extrabold">{track.title}</h4>
          <h6>{track.artist}</h6>
        </div>
      </div>
    </div>
  );
};

export default Poster;
