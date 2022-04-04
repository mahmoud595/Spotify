import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { ImHeadphones } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";

import { useContext, useState } from "react";
import PlayContext from "../store/PlayButtonContext";
const Track = ({ track }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const { play, changePlay, playTrack, changeTrack } = useContext(PlayContext);
  const handlePlay = (bool) => {
    changePlay(bool);
    changeTrack(track);
  };
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 transition group ease-out cursor-default ">
      <div className="flex items-center w-full">
        <img
          src={track.albumUrl}
          alt={track.title}
          className="rounded-xl h-12 w-12 object-cover mr-3"
        />
        <div>
          <h4 className="text-white font-semibold text-sm truncate w-[450px]">
            {track.title}
          </h4>
          <p className="text-[rgb(179,179,179)] text-[13px] group-hover:text-[white] font-semibold">
            {track.artist}
          </p>
        </div>
        <div className="md:ml-auto flex items-center space-x-2.5">
          <div className="text-white flex space-x-1 text-sm font-semibold">
            <ImHeadphones className="text-lg" />
            <h4 className="font-sans">{track.popularity}</h4>
          </div>
          <div className="flex items-center rounded-full border-2 border-[#262626] w-[85px] h-10 relative cursor-pointer group-hover:border-white/40">
            <AiFillHeart
              className={`text-xl ml-3 icon ${
                hasLiked ? "text-[#1ED760]" : "text-[#868686]"
              }`}
              onClick={() => setHasLiked(!hasLiked)}
            />
            {track.uri === playTrack?.uri && play ? (
              <>
                <div
                  className="h-10 w-10 rounded-full border border-[#15883e] flex items-center justify-center absolute -right-0.5 bg-[#15883e] icon hover:scale-110"
                  onClick={() => handlePlay(false)}
                >
                  <BsFillPauseFill className="text-white text-xl" />
                </div>
              </>
            ) : (
              <>
                <div
                  className="h-10 w-10 rounded-full border border-white/60 flex items-center justify-center absolute -right-0.5 hover:bg-[#15883e] hover:border-[#15883e] icon hover:scale-110"
                  onClick={() => handlePlay(true)}
                >
                  <BsFillPlayFill className="text-white text-xl ml-[1px]" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
