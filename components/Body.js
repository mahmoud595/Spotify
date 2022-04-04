import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Search from "./Search";
import Poster from "./Poster";
import { useRouter } from "next/router";
import { useContext } from "react";
import PlayContext from "../store/PlayButtonContext";
import Track from "./Track";

import { restructureData } from "../utils/helperFunctions";

const Body = ({ spotifyApi }) => {
  const { play, changePlay, playTrack, changeTrack } = useContext(PlayContext);

  const [search, setSearch] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const accessToken = session?.accessToken;

    if (!accessToken) router.push("/auth/signin");
    spotifyApi.setAccessToken(accessToken);
  }, [session]);

  const fetchNewReleases = async () => {
    const res = await spotifyApi.getNewReleases();
    const tracks = res.body.albums.items.map((track) => {
      return restructureData(track);
    });

    return tracks;
  };

  const { data: newReleases, status } = useQuery(
    "newReleases",
    fetchNewReleases,
    {
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const fetchSearchTracks = async () => {
    const res = await spotifyApi.searchTracks(search);
    const tracks = res.body.tracks.items.map((track) => {
      return restructureData(track);
    });
    return tracks;
  };

  const { data: searchTracks } = useQuery(
    ["searchTracks", search],
    fetchSearchTracks,
    {
      enabled: !!search,
      retryOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <section className="flex-grow ml-1 py-4 space-y-8 md:max-w-6xl md:mr-2.5">
      <Search search={search} setSearch={setSearch} />
      <div className="py-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 px-4 overflow-y-scroll scrollbar-hide h-96">
        {search
          ? searchTracks
              ?.slice(0, 4)
              .map((track) => <Poster key={track?.id} track={track} />)
          : newReleases
              ?.slice(0, 4)
              .map((track) => <Poster key={track?.id} track={track} />)}
      </div>

      <div className="absolute gap-x-8 flex md:relative ml-6 min-w-full">
        {/*Genres */}
        <div className="hidden xl:inline max-w-[270px]">
          <h2 className="text-white font-bold mb-3">Genres</h2>
          <div className="flex flex-wrap gap-x-2 gap-y-2.5 mb-3">
            <div className="genre">Classic</div>
            <div className="genre">House</div>
            <div className="genre">Minimal</div>
            <div className="genre">Hip-hop</div>
            <div className="genre">Electronic</div>
            <div className="genre">Chillout</div>
            <div className="genre">Blues</div>
            <div className="genre">Country</div>
            <div className="genre">Techno</div>
            <button className="bigBtn">All Genres</button>
          </div>
        </div>
        <div>
          <h2 className="text-white font-bold mb-3">
            {search && searchTracks?.length ? "Tracks" : "New Releases"}
          </h2>
          <div className="space-y-3 border-2 border-[#262626] rounded-2xl p-3 bg-[#0D0D0D] overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]">
            {!searchTracks?.length
              ? newReleases
                  ?.slice(4, newReleases.length)
                  ?.map((track) => (
                    <Track
                      key={track?.id}
                      track={track}
                      playTrack={playTrack}
                    />
                  ))
              : searchTracks
                  ?.slice(4, searchTracks.length)
                  ?.map((track) => (
                    <Track
                      key={track?.id}
                      track={track}
                      playTrack={playTrack}
                    />
                  ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
