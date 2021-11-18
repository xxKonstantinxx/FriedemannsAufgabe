import React, { useState } from 'react'
import { submit } from '../../logic/data-handler'

interface IProps {
    categories: Array<categories>
    onGetAds: () => void
  }
  
  interface categories {
    id: string;
    name: string;
    ads: Array<string>;
  }


function NewAd (props: IProps){
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [categories, setCategories] = useState<Array<string>>([])
    const [url, setUrl] = useState<string>("")


    async function onSubmit(){
      await submit(url, title, categories)
      props.onGetAds()
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
          onSubmit();
        }}>Submit</button>
        </div> : <div><button onClick={(event: React.MouseEvent<HTMLElement>) => {
          setIsCreating(true);
        }}>Create Ad</button></div> }
    </div>
}

export default NewAd;