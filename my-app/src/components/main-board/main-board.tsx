import React, { useState, useEffect } from "react";
import Ads from "../ads/ads";
import NewAd from "../ads/new-ad";
import Axios from "axios";
import {
  FetchData, GetCategories
} from "../../logic/data-handler";

interface Data {
  expires: number;
  refresh_token: string;
  token: string;
  token_type: string;
}

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
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [tokenExpires, setTokenExpires] = useState<number>();

  function refreshSession() {
    Axios.request<Data>({
      method: "post",
      url: "http://127.0.0.1:8888/token_refresh",
      headers: {
        "Content-Type": "application/json",
      },
      data: { refresh_token: refreshToken },
    }).then((res) => {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("refresh_token", res.data.refresh_token);
      sessionStorage.setItem("expires", JSON.stringify(res.data.expires));
      setToken(res.data.token);
      setRefreshToken(res.data.refresh_token);
      setTokenExpires(res.data.expires);
      sessionHandler();
      console.log("Token refreshed");
    });
  }

  function sessionHandler() {
    setTimeout(refreshSession, 300000);
  }

  async function getAdsHandler() {
    setMatchedAds(await FetchData());
    setCategories(await GetCategories(String(sessionStorage.getItem("token"))))
  }



  useEffect(() => {
    setToken(String(sessionStorage.getItem("token")));
    setRefreshToken(String(sessionStorage.getItem("refresh_token")));
    setTokenExpires(Number(sessionStorage.getItem("expires")));
    getAdsHandler()
  }, []);

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
          token={token}
          ads={matchedAds}
          categories={categories}
          onGetAds={getAdsHandler}
        />
        <NewAd token={token} categories={categories} onGetAds={getAdsHandler} />
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
