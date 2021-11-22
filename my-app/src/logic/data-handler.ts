import Axios from "axios";

interface Data {
  expires: number;
  refresh_token: string;
  token: string;
  token_type: string;
}

interface UrlData {
  id: string;
  url: string;
  ad: string;
}

interface UrlResponse {
  ad: string;
  id: string;
  url: string;
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
    url: "http://85.214.140.185:8888/login",
    data: { username: userName, password: password },
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function getAds(token: string) {
  return Axios.request<Array<Ad>>({
    method: "get",
    url: "http://85.214.140.185:8888/ads",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);
}

export function getCategories(token: string) {
  return Axios.request<Array<Categories>>({
    method: "get",
    url: "http://85.214.140.185:8888/categories",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);
}

function getUrls(token: string) {
  return Axios.request<Array<Urls>>({
    method: "get",
    url: "http://85.214.140.185:8888/urls",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.data);
}

var matchedAd: MatchedAd[] = [];
export async function fetchData() {
  var token = String(sessionStorage.getItem("token"));
  await Promise.all([getAds(token), getUrls(token), getCategories(token)]).then(
    (res) => {
      matchedAd = matchAds(res);
    }
  );
  return matchedAd;
}

export async function submit(url: string, title: string, categories: Array<string>){
  await submitUrl(url).then(res => submitAd(title, categories, res.data.id))
}

function submitUrl(url: string){
  const token = sessionStorage.getItem("token");
    return Axios.request<UrlData>({
    method: "post",
    url: "http://85.214.140.185:8888/urls",
    data: { url: url },
    headers: {
      AuthoriZation: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
}

function submitAd(title: string, categories: Array<string>, click_url: string){
  const token = sessionStorage.getItem("token");
  return Axios.request<object>({
    method: "post",
    url: "http://85.214.140.185:8888/ads",
    data: { title: title, click_url: click_url, categories: categories },
    headers: {
      AuthoriZation: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
}

export function editHandler(
  editedUrl: string,
  editedTitle: string,
  editedCategories: Array<string>,
  click_url: string,
  id: string,
  oldTitle: string
) {
  const token = sessionStorage.getItem("token");
  if (editedUrl !== "") {
    return Axios.request<UrlResponse>({
      method: "patch",
      url: `http://85.214.140.185:8888/urls/${click_url}`,
      data: { url: editedUrl },
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return Axios.request({
          method: "patch",
          url: `http://85.214.140.185:8888/ads/${id}`,
          data: { title: editedTitle, categories: editedCategories },
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else if (editedTitle === "") {
    return Axios.request({
      method: "patch",
      url: `http://85.214.140.185:8888/ads/${id}`,
      data: { title: oldTitle, categories: editedCategories },
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  } else
    return Axios.request({
      method: "patch",
      url: `http://85.214.140.185:8888/ads/${id}`,
      data: { title: editedTitle, categories: editedCategories },
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
}

export function deleteAd(id: string) {
  const token = sessionStorage.getItem("token");
  return Axios.request({
    method: "delete",
    url: `http://85.214.140.185:8888/ads/${id}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export function logOut(): void {
  Axios.get("http://85.214.140.185:8888/logout").then();
  sessionStorage.clear();
  window.location.replace("/");
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
  return matched;
}
