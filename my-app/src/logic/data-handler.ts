import Axios from 'axios'

interface Data {
    expires: number;
    refresh_token: string;
    token: string;
    token_type: string;
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
  
  interface Urls {
    id: string;
    url: string;
    ad: string;
  }
  
  interface MatchedAd {
    id: string;
    title: string;
    url: string;
    categories: Array<string>;
    click_url: string;
  }

export function Login(userName: string, password: string) {
    return Axios.request<Data>({
      method: "post",
      url: "http://127.0.0.1:8888/login",
      data: { username: userName, password: password },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  export function GetAds(token: string){
    return Axios.request<Array<Ad>>({
        method: "get",
        url: "http://127.0.0.1:8888/ads",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data);
  }

  export function GetCategories(token: string){
        return Axios.request<Array<Categories>>({
          method: "get",
          url: "http://127.0.0.1:8888/categories",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.data);
  }

  export function GetUrls(token: string){
    return Axios.request<Array<Urls>>({
        method: "get",
        url: "http://127.0.0.1:8888/urls",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.data);
  }

var matchedAd: MatchedAd[] = []
  export async function FetchData(){
        var token = String(sessionStorage.getItem("token"))
        await Promise.all([GetAds(token), GetUrls(token), GetCategories(token)]).then((res) => {
        matchedAd = matchAds(res);
      })
      return matchedAd
  }



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
    return (matched);
  }
