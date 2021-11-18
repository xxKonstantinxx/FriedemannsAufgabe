import React, { useState, useEffect } from "react";
import Ads from "../ads/ads";
import NewAd from "../ads/new-ad";
import Axios from "axios";
import { FetchData, getCategories } from "../../logic/data-handler";
import { sessionHandler } from "../../logic/session-handler";

interface Categories {
  id: string;
  name: string;
  ads: Array<string>;
}

interface MatchedAd {
  id: string;
  title: string;
  url: string;
  categories: Array<string>;
  click_url: string;
}

const MainBoard = () => {
  const [matchedAds, setMatchedAds] = useState<Array<MatchedAd>>([]);
  const [categories, setCategories] = useState<Array<Categories>>([]);

  useEffect(() => {
    getAdsHandler();
    sessionHandler();
  }, []);

  async function getAdsHandler() {
    setMatchedAds(await FetchData());
    setCategories(await getCategories(String(sessionStorage.getItem("token"))));
  }

  function logOut(): void {
    Axios.get("http://127.0.0.1:8888/logout").then();
    sessionStorage.clear();
    window.location.replace("/");
  }

  return (
    <div className="mainboard">
      <button
        className="logoutbtn"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          logOut();
        }}
      >
        Log Out
      </button>
      <div className="App">
        <Ads
          ads={matchedAds}
          categories={categories}
          onGetAds={getAdsHandler}
        />
        <NewAd categories={categories} onGetAds={getAdsHandler} />
        <button
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            getAdsHandler();
          }}
        ></button>
      </div>
    </div>
  );
};

export default MainBoard;
