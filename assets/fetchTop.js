const fetchTop5 = async () => {
  // gets the worldwide top playlist from deezer themselves
  const url = "https://deezerdevs-deezer.p.rapidapi.com/playlist/3155776842";
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
    console.log(result["tracks"]["data"]);
    const topSongs = result["tracks"]["data"].slice(0, 5);
    console.log(topSongs);


    let glideChildString = `<li class="glide__slide"><a><img src="https://placehold.co/300x300" alt="">
        <h4>#1 Today</h4>   </a>   </li>`;

    for (let index = 0; index < topSongs.length; index++) {
      let element = $(glideChildString);
      element.find("img").attr("src", topSongs[index]["album"]["cover"]);
      element.find("h4").text(`#${index + 1} TODAY`);
      element.find("a").attr("href", topSongs[index]["link"]);
	    element.find('img').css("width:300px; height:300px;");
      $("ul.glide__slides").append(element);
    }
  } catch (error) {
    console.error(error);
  }
      const config = {
        type: 'carousel',
        startAt: 0,
        perView: 3,
        breakpoints: {
          1000: {
            perView: 2
          },
          900: {
            perView: 1
          }

        }
      } ;
      new Glide('.glide', config).mount() ;
};

window.addEventListener('load', fetchTop5);
