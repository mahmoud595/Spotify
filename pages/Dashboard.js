import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Body from "../components/Body";
import Right from "../components/Right";
import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import PlayContext from "../store/PlayButtonContext";
import Player from "../components/Player";

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});
const Dashboard = () => {
  return (
    <main className="flex">
      <Sidebar />
      <Body spotifyApi={spotifyApi} />
      <Right spotifyApi={spotifyApi} />
      <div className="fixed bottom-0 right-0 left-0 z-40">
        <Player />
      </div>
    </main>
  );
};

export default Dashboard;
