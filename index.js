'use strict'; 
/*eslint-env jquery*/

const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'; 
const key = 'AIzaSyA9QNhgEjdZ6beCZulcwHDUdTWcItmG3c4'; 
let next =''; 
let prev =''; 
let searchTerm ='';

function getDataFromApi(query, callback){
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback); 
}

function render(result){ 
  console.log(result.title);
  return `
  <p>${result.title}</p>
  <a href="https://www.youtube.com/watch?v=${result.id}">
    <img src=${result.thumbnail}></img></a>
    <br>
    <a href="https://www.youtube.com/channel/${result.channel}">Click here for more videos from this Channel: ${result.channelName}</a>
  `; 
}

function displayTubeData(data){ 
  const results = data.items.map((item) => render({
    id : item.id.videoId, 
    title: item.snippet.title, 
    thumbnail : item.snippet.thumbnails.high.url,
    channel : item.snippet.channelId, 
    channelName : item.snippet.channelTitle
  }));

  next = data.nextPageToken; 
  prev = data.prevPageToken; 
  
  $('#tubeContainer').html(results);
}

function handleNext(){ 
  $('.next').click(function(){ 
    const query = { q: `${searchTerm}`, key : key,  pageToken: next, part :'snippet'}; 
    getDataFromApi(query, displayTubeData); 
  });
}

function handlePrev(){ 
  $('.prev').click(function(){ 
    const query = { q: `${searchTerm}`, key : key,  pageToken: prev, part :'snippet'}; 
    getDataFromApi(query, displayTubeData); 
  });
}

function watchSubmit() { 
  $('#formInput').submit(function(event){ 
    event.preventDefault(); 
    const val = $('#search').val(); 
    searchTerm = val; 
    $('#search').val(''); 
    const query = { q: `${searchTerm}`, key : key, part :'snippet'}; 
    getDataFromApi(query, displayTubeData); 

  });
}

function handleFunctions(){ 
  watchSubmit(); 
  handleNext();
  handlePrev(); 
}

$(handleFunctions); 
