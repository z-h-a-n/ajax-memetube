//add a <li> to the video 
function appendNewVideo(data) {
  $('<li id="video" >' + data.title + '</li>').prependTo("#video-list")
}


function listVideos(e) {
  //ajax request to retrieve all the videos from the database
  $.ajax({
    type: 'GET',
    url: '/videos',
    dataType: 'json'
  }).done(function(data){
    $.each(data, function(index, title){
      appendNewVideo(title);
    })
  })
}

function addVideo(e){
  e.preventDefault();
  console.log('addVideo');
  var title = $('#title').val()
  var description = $('#description').val()
  var url = $('#url').val()
  var genre = $('#genre').val()
  $.ajax({
    type: 'POST',
    url: '/videos',
    dataType: 'json',
    data: {title: title, description: description, url: url, genre: genre}
  }).done(function(data){
    console.log(data);
    appendNewVideo(data);
    // $('#title').val('')
    $('#description').val('')
    $('#url').val('')
    $('#genre').val('')
  })
}

function showVideo(e){
  console.log('showVideo');


  $('.play-video').append(
    // '<iframe src="https://player.vimeo.com/video/'+ data.title +'" frameborder="0" allowfullscreen></iframe>'

    '<iframe src="https://player.vimeo.com/video/109246134" frameborder="0" allowfullscreen></iframe>'

    )

}


$(document).ready(function(){
  listVideos();

  $('#add-video').on('click', addVideo);
  $('#video-list').on('click', '#video', showVideo);


});



