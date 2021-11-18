import React from "react";
import "./ads.css";
import EditAd from "./edit-ad";

interface IProps {
  ads: Array<Ad>;
  categories: Array<Categorie>;
  onGetAds: () => void;
}

interface Categorie {
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
