//Array for initial arts buttons

var artsArray = ["film", "music", "dance"];

//Function to create buttons with indices from artsArray

function initializeButtonsFunction(artsArray, newClass, newClassArea){
    $(newClassArea).empty();
    for (var i=0; i<artsArray.length; i++){
        var newButton = $('<button>');
        newButton.addClass(newClass);
        newButton.attr('data-type',artsArray[i]);
        newButton.text(artsArray[i]);
        $(newClassArea).append(newButton);
    }

}
//Function to display buttons on page

$(function(){
    initializeButtonsFunction(artsArray,'artGifsButton','#artButtons');
})

//Attempt to allow user to add more buttons; not sure why it won't work; looks like it's reloading the page instead of recording/outputting a button that corresponds what the user enters in the search box.

$("#art-input").on('click',function(event){
    event.preventDefault();
    

    var faveArtGifs = $('#art-input').val().trim();
    console.log(faveArtGifs);
    artsArray.push(faveArtGifs);
    console.log(artsArray);
    initializeButtonsFunction(artsArray,'artGifsButton','#artButtons');
    console.log(faveArtGifs);
    // return false;
    console.log(artsArray);
})

// Event listener for artGifsButtons
$(document).on("click",".artGifsButton",function(){
    $('#artGifs').empty();
    var type = $(this).data('type');

    // Storing our giphy API URL for art images
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+type+"&api_key=l0M6WdZ8CWJQSRp8y23fF0RJXEg2mvZR&limit=5"
    
    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url:queryURL,
      method:"GET"
    })

    // After the data from the AJAX request comes back
    .then(function(response){
        for(var i=0;i<response.data.length;i++){
            var newDiv = $('<div class="search-item">');

        //Create variable to store rating
            var rating = response.data[i].rating;
        //Create variable to generate html for gif headings  
        var p = $('<p>').text('Rating: '+rating);

        //Set variables to determine state of gifs
        var animatedGif = response.data[i].images.fixed_height.url;
        var stillGif = response.data[i].images.fixed_height_still.url;
        var image = $('<img>');
        image.attr('src',stillGif);
        image.attr('data-still',stillGif);
        image.attr('data-animated',animatedGif);
        image.attr('data-state','still');
        image.addClass('findGifs');
        newDiv.append(p);
        newDiv.append(image);
        $('#artGifs').append(newDiv);
        }
    })
})

$(document).on('click','.findGifs',function(){
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr('data-state');
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
    if(state === 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }
});