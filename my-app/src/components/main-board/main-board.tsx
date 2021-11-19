import React, { useState, useEffect } from "react";
import Ads from "../ads/ads";
import { fetchData, getCategories, logOut } from "../../logic/data-handler";
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
    setMatchedAds(await fetchData());
    setCategories(await getCategories(String(sessionStorage.getItem("token"))));
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
      <button
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              window.location.replace('/newad');
            }}
          >
            Create Ad
          </button>
        <Ads
          ads={matchedAds}
          categories={categories}
          onGetAds={getAdsHandler}
        />
      </div>
    </div>
  );
};

export default MainBoard;
