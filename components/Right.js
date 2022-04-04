import React, { useEffect } from "react";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlineSettings } from "react-icons/md";
import { BiBell } from "react-icons/bi";
import { ViewGridIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";

import Dropdown from "./Dropdown";
import { restructureData } from "../utils/helperFunctions";
import { useQuery } from "react-query";
import RecentlyPlayed from "./RecentlyPlayed";

const Right = ({ spotifyApi }) => {
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  useEffect(() => {
    if (!accessToken) return;
  }, [accessToken]);

  const fetchRecentlyPlayed = async () => {
    const res = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 });
    const tracks = res.body.items.map(({ track }) => {
      console.log(track.name);

      return restructureData(track);
    });

    return tracks;
  };
  const { data: recentlyPlayed } = useQuery(
    "recentlyPlayed",
    fetchRecentlyPlayed,
    {
      // retryOnMount: false,
      // refetchOnWindowFocus: false,
    }
  );

  return (
    <section className="p-4 pr-8 space-y-8 ">
      <div className="flex justify-between items-center space-x-4">
        <div className="border-2 border-[#262626] py-3 px-4 flex h-12 rounded-full items-center space-x-4">
          <HiOutlineShieldCheck className="text-[#CCCCCC] text-xl" />
          <MdOutlineSettings className="text-[#CCCCCC] text-xl" />
          <BiBell className="text-[#CCCCCC] text-xl" />
        </div>
        <Dropdown />
      </div>
      <div className="space-y-4 p-4 border-2 border-[#262626] bg-[#0d0d0d] rounded-xl">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-semibold text-sm ">Recently Played</h4>
          <ViewGridIcon className="text-[#686868] h-6" />
        </div>
        <div className="space-y-4 h-[250px] md:h-[400px] overflow-y-scroll overflow-x-hidden scrollbar-hide ">
          {recentlyPlayed?.map((track, index) => (
            <RecentlyPlayed track={track} key={index} />
          ))}
          <button className="bigBtn">View All</button>
        </div>
      </div>
    </section>
  );
};

export default Right;
