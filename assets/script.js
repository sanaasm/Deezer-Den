//new Glide('.glide').mount()

var searches = [];
let appId = "54521986645452198664";
const cleanSearch = (searchTerm) => {
  let str = searchTerm.replace(/ /g, "-");
  return str;
};

//Working on api
const search = async (searchTerm) => {
  const url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${cleanSearch(
    searchTerm
  )}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "444d2ddda8mshf9bee96999e82f2p1c6386jsn9d2170e8e31d",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    $('.row-container').append(getArtistElement(result));
  } catch (error) {
    console.error(error);
  }
};

const getArtistElement = async (data) => {
  console.log(data);
  let element = $(`<div class="arist-card">
  <a href="">
      <h2>Artist Name</h2>
      <img src="" alt="artist name">
  </a>
  
</div>`);
  element.find('h2').text(data["name"]);
  element.find(`image`).attr('src' ,data["picture_xl"]);
  return element;
};

// search("beyonce");
// search("daft-punk");

let startSearch = () => {
  let st = cleanSearch($("#search").val());
  console.log(st);
  search(st);
};

$("#search-button").on("click", startSearch);
