import React, { useEffect, useState } from "react";
import { getCategories, submit } from "../../logic/data-handler";

interface Categories {
  id: string;
  name: string;
  ads: Array<string>;
}

function NewAd() {
  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<Array<string>>([]);
  const [categorieList, setCategorieList] = useState<Array<Categories>>([]);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    getCategories(String(sessionStorage.getItem("token"))).then((res) =>
      setCategorieList(res)
    );
  }, []);

  async function onSubmit() {
    await submit(url, title, categories);
    window.location.replace("/home");
  }
  return (
    <div className="create-ad">
      <div className="newad">
        <label>Title:</label>
        <input
          type="text"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></input>
        <label>categories</label>
        <select
          name="categories"
          onChange={(event) => {
            setCategories([event.target.value]);
          }}
        >
          <option value={""}>None</option>
          {categorieList.map((val, key) => {
            return <option value={val.id}>{val.name}</option>;
          })}
        </select>
        <label>url:</label>
        <input
          type="text"
          onChange={(event) => {
            setUrl(event.target.value);
          }}
        ></input>
        <button
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            onSubmit();
          }}
        >
          Submit
        </button>
      </div>
      <button
        className="cancelbtn"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          window.location.replace("/home");
        }}
      >
        Cancel
      </button>
    </div>
  );
}

export default NewAd;
