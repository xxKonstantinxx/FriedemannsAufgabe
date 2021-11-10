import React from "react";
import "./Ads.css";
import EditAd from "./EditAd";

interface IProps {
  ads: Array<Ad>;
  categories: Array<categorie>;
  token: String | null;
  onGetAds: () => void;
}

interface categorie {
  id: string;
  name: string;
  ads: Array<string>;
}

interface Ad {
  id: string;
  title: string;
  url: string | undefined;
  categories: Array<string>;
  click_url: string;
}

function Ads(props: IProps) {
  return (
    <div className="ads-container">
      <div className="label">
        <label>title:</label>

        <label>categorie:</label>

        <label>click_url</label>
      </div>
      {props.ads.map((val, key) => {
        return (
          <div key={key}>
            <EditAd
              token={props.token}
              onGetAds={props.onGetAds}
              click_url={val.click_url}
              id={val.id}
              title={val.title}
              categories={val.categories}
              url={val.url}
              categorieList={props.categories}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Ads;
