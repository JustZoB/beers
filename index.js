$.get( "https://api.punkapi.com/v2/beers?page=1&limit=25", function( list ) {
    console.log(list);
    list.forEach(beer => {
        $('#root').append(`
            <div class='beer'>
                <div class='image'><img src="${beer.image_url}" alt="Beer image"></div>
                <p class='id'>${beer.id}</p>
                <h2 class='name'>${beer.name}</h2>
                <p class='description'>${beer.description}</p>
                <p class='brewers_tips'>${beer.brewers_tips}</p>
            </div>`
        );
    });
});