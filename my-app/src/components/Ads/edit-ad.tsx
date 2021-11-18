import React, { useState } from "react";
import { deleteAd, editHandler } from '../../logic/data-handler'
import "./ads.css";

interface IProps {
  title: string;
  categories: string[];
  url: string | undefined;
  categorieList: Array<Categories>;
  id: string;
  click_url: string;
  onGetAds: () => void;
}

interface Categories {
  id: string;
  name: string;
  ads: Array<string>;
}


function EditAd(props: IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategories, setEditedCategories] = useState<Array<string>>([]);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedUrl, setEditedUrl] = useState("");


  async function onEdit(){
    await editHandler(editedUrl, editedTitle, editedCategories, props.click_url, props.id, props.title)
    setIsEditing(false)
  }

  function startEditing() {
    setIsEditing(true);
  }

  function stopEditing() {
    setIsEditing(false);
  }

  async function onDeleteAd(){
    await deleteAd(props.id)
    props.onGetAds()
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
              onDeleteAd();
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
              onEdit();
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
