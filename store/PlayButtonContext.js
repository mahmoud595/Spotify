import { createContext, useState } from "react";

const PlayContext = createContext();

export const PlayButtonContextProvider = (props) => {
  const [play, setPlay] = useState(false);
  const [playTrack, setPlayTrack] = useState(null);
  const changePlay = (bool) => {
    setPlay(bool);
  };
  const changeTrack = (track) => {
    setPlayTrack(track);
  };
  return (
    <PlayContext.Provider value={{ play, changePlay, playTrack, changeTrack }}>
      {props.children}
    </PlayContext.Provider>
  );
};

export default PlayContext;
