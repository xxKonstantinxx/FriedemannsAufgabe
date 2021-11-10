import React, { useState } from "react";
import Axios from "axios";
import "./ads.css";

interface IProps {
  title: string;
  categories: string[];
  url: string | undefined;
  categorieList: Array<categories>;
  token: string | null;
  id: string;
  click_url: string;
  onGetAds: () => void;
}

interface categories {
  id: string;
  name: string;
  ads: Array<string>;
}

interface UrlResponse {
  ad: string;
  id: string;
  url: string;
}

function EditAd(props: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategories, setEditedCategories] = useState<Array<string>>([]);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedUrl, setEditedUrl] = useState("");

  function editHandler() {
    if (editedUrl !== "") {
      return Axios.request<UrlResponse>({
        method: "patch",
        url: `http://127.0.0.1:8888/urls/${props.click_url}`,
        data: { url: editedUrl },
        headers: {
          authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          return Axios.request({
            method: "patch",
            url: `http://127.0.0.1:8888/ads/${props.id}`,
            data: { title: editedTitle, categories: editedCategories },
            headers: {
              authorization: `Bearer ${props.token}`,
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              console.log(res);
              setIsEditing(false);
              props.onGetAds();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else if (editedTitle === "") {
      return Axios.request({
        method: "patch",
        url: `http://127.0.0.1:8888/ads/${props.id}`,
        data: { title: props.title, categories: editedCategories },
        headers: {
          authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          setIsEditing(false);
          props.onGetAds();
        })
        .catch((err) => console.log(err));
    } else
      return Axios.request({
        method: "patch",
        url: `http://127.0.0.1:8888/ads/${props.id}`,
        data: { title: editedTitle, categories: editedCategories },
        headers: {
          authorization: `Bearer ${props.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          setIsEditing(false);
          props.onGetAds();
        })
        .catch((err) => console.log(err));
  }

  function deleteAd() {
    Axios.request({
      method: "delete",
      url: `http://127.0.0.1:8888/ads/${props.id}`,
      headers: {
        authorization: `Bearer ${props.token}`
      },
    }).then((res) => {console.log(res); props.onGetAds()})
  }

  function startEditing() {
    setIsEditing(true);
    console.log(props.categorieList);
  }

  function stopEditing() {
    setIsEditing(false);
  }

  return (
    <div className="ads">
      {!isEditing ? (
        <div className="ads">
          <p className="title ad">{props.title}</p>
          <p className="categorie ad">{props.categories}</p>
          <p className="click_url ad">{props.url}</p>
          <div className="buttonwrap">
          <button className="editbtn"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              startEditing();
            }}
          >
            Edit
          </button>
          <button className="deletebtn" onClick={(event: React.MouseEvent<HTMLElement>) => {
              deleteAd();
            }}>delete</button>
            </div>
        </div>
      ) : (
        <div className="ads">
          <input
            className="title edit-ad"
            placeholder={props.title}
            onChange={(event) => {
              setEditedTitle(event.target.value);
            }}
          ></input>
          <select
            className="categorie edit-ad"
            name="categorie"
            onChange={(event) => {
              setEditedCategories([event.target.value]);
            }}
            multiple
          >
            <option value={""}>None</option>
            {props.categorieList.map((val, key) => {
              return <option value={val.id}>{val.name}</option>;
            })}
          </select>
          <input
            className="click_url edit-ad"
            placeholder={props.url}
            onChange={(event) => {
              setEditedUrl(event.target.value);
            }}
          ></input>
          <button
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              editHandler();
            }}
          >
            Submit
          </button>
          <button
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              stopEditing();
            }}
          >
            stop editing
          </button>
        </div>
      )}
    </div>
  );
}

export default EditAd;
