import React, { useState, useEffect, useCallback } from "react";
import Ads from "../ads/ads";
import NewAd from "../ads/new-ad";
import Axios from "axios";

interface Data {
  expires: number;
  refresh_token: string;
  token: string;
  token_type: string;
}

interface Urls {
  id: string;
  url: string;
  ad: string;
}

interface Ad {
  id: string;
  title: string;
  click_url: string;
  categories: Array<string>;
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



  function refreshSession(){
    Axios.request<Data>({
      method: "post",
      url: "http://127.0.0.1:8888/token_refresh",
      headers: {
        "Content-Type": "application/json",
      },
      data: {refresh_token: refreshToken}
    }).then((res) => {
      sessionStorage.setItem("token", res.data.token);
      sessionStorage.setItem("refresh_token", res.data.refresh_token);
      sessionStorage.setItem("expires", JSON.stringify(res.data.expires));
      setToken(res.data.token)
      setRefreshToken(res.data.refresh_token)
      setTokenExpires(res.data.expires)
      sessionHandler();
      console.log("Token refreshed")
  })}

  function sessionHandler(){
    setTimeout(refreshSession, 300000)
  }

  const getAds = useCallback(() => {
    return Axios.request<Array<Ad>>({
      method: "get",
      url: "http://127.0.0.1:8888/ads",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data);
  }, [token]);

  const getUrls = useCallback(() => {
    return Axios.request<Array<Urls>>({
      method: "get",
      url: "http://127.0.0.1:8888/urls",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data);
  }, [token]);

  const getCategories = useCallback(() => {
    return Axios.request<Array<Categories>>({
      method: "get",
      url: "http://127.0.0.1:8888/categories",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data);
  }, [token]);

  function matchAds(res: [Ad[], Urls[], Categories[]]) {
    let matched: Array<MatchedAd> = [];
    let adsToMatch = res[0];
    let urlsToMatch = res[1];
    let categoriesToMatch = res[2];
    for (const i in adsToMatch) {
      matched.push({
        id: adsToMatch[i].id,
        categories: adsToMatch[i].categories,
        title: adsToMatch[i].title,
        url: urlsToMatch.find((x) => x.id === adsToMatch[i].click_url)
          ?.url as string,
        click_url: adsToMatch[i].click_url,
      });
    }
    for (const ad in matched) {
      for (const categorie in matched[ad].categories) {
        matched[ad].categories.splice(
          matched[ad].categories.indexOf(categorie),
          1,
          categoriesToMatch.find(
            (x) => x.id === matched[ad].categories[categorie]
          )?.name as string
        );
      }
    }
    setMatchedAds(matched);
  }

  function getAdsHandler() {
    fetchData();
  }

  const fetchData = useCallback(() => {
    Promise.all([getAds(), getUrls(), getCategories()]).then((res) => {
      matchAds(res);
      setCategories(res[2]);
      sessionHandler();
    });
  }, [getAds, getCategories, getUrls,]);

  useEffect(() => {
    setToken(String(sessionStorage.getItem("token")));
    setRefreshToken(String(sessionStorage.getItem("refresh_token")));
    setTokenExpires(Number(sessionStorage.getItem("expires")))
    fetchData();
  }, [fetchData]);

  function logOut(): void {
    Axios.get("http://127.0.0.1:8888/logout");
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
        <button onClick={(event: React.MouseEvent<HTMLElement>) => {
          sessionHandler();
        }}></button>
      </div>
    </div>
  );
};

export default MainBoard;
