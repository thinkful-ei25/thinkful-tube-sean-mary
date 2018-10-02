'use strict'; 

/*eslint-env jquery*/

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'; 
const key = 'AIzaSyA9QNhgEjdZ6beCZulcwHDUdTWcItmG3c4'; 

function getDataFromApi(search, callback){
  const query = { q: `${search}`, key : key, part :'snippet'}; 
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback); 
}

function render(result){ 
  console.log(result.title);
  return `
  <p>${result.title}</p>
  <a href="https://www.youtube.com/watch?v=${result.id}">
    <img src=${result.thumbnail}></img></a>
    <br>
    <a href="${result.channel}">Click here for more videos from this Channel: ${result.channelName}</a>
  `; 
}

function displayTubeData(data){ 
  // console.log(data.items[0].snippet.title);
  const results = data.items.map((item) => render({
    id : item.id.videoId, 
    title: item.snippet.title, 
    thumbnail : item.snippet.thumbnails.high.url
  }));
  $('#tubeContainer').html(results);

}

function watchSubmit() { 
  $('#formInput').submit(function(event){ 
    event.preventDefault(); 
    const val = $('#search').val(); 

    getDataFromApi(val, displayTubeData); 
  });
}

$(watchSubmit); 
