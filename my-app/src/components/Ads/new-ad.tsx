import React, { useState } from 'react'
import Axios from 'axios'

interface IProps {
    categories: Array<categories>
    token:String | null
    onGetAds: () => void
  }
  
  interface categories {
    id: string;
    name: string;
    ads: Array<string>;
  }

  interface urlData{
      id: string
      url: string
      ad: string | null
  }
  

function NewAd (props: IProps){
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [categories, setCategories] = useState<Array<string>>([])
    const [url, setUrl] = useState<string>("")

    function submit (){

        Axios.request<urlData>({
            method: "post",
            url: "http://127.0.0.1:8888/urls",
            data: {url: url},
            headers: {
              AuthoriZation: `Bearer ${props.token}`,
              "Content-Type": "application/json" 
            },
          }).then((res) => {
            Axios.request<object>({
                method: "post",
                url: "http://127.0.0.1:8888/ads",
                data: {title: title, click_url: res.data.id, categories: categories},
                headers: {
                  AuthoriZation: `Bearer ${props.token}`,
                  "Content-Type": "application/json" 
                },
              }).then((res) => {
                console.log(res);
                props.onGetAds()
              });
          });
    }

    return <div>
        {isCreating? 
        <div className="newad">
            <label>Title:</label>
            <input type="text" onChange={(event) => {setTitle(event.target.value)}}></input>
            <label>categories</label>
            <select name="categories" onChange={(event) =>{
            setCategories([event.target.value])}}>
                <option value={""}>None</option>
                {props.categories.map((val, key) => { 
                    return <option value={val.id}>{val.name}</option>
                })}
            </select>
            <label>url:</label>
            <input type="text" onChange={(event) => {setUrl(event.target.value)}}></input>
            <button onClick={(event: React.MouseEvent<HTMLElement>) => {
          submit();
        }}>Submit</button>
        </div> : <div><button onClick={(event: React.MouseEvent<HTMLElement>) => {
          setIsCreating(true);
        }}>Create Ad</button></div> }
    </div>
}

export default NewAd;