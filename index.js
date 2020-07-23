function getBeers(page) {
    $.get(`https://api.punkapi.com/v2/beers?page=${page}&limit=25`, function( list ) {
        if (list.length != 0) {
            list.forEach(beer => {
                $('#beerList').append(`
                    <div class='beer'>
                        <p class='id'>${beer.id}</p>
                        <button class="close"></button>
                        <div class='image'><img src="${beer.image_url}" alt="Beer image"></div>
                        <h2 class='name'>${beer.name}</h2>
                        <p class='description'>${beer.description}</p>
                        <p class='brewers_tips'>${beer.brewers_tips}</p>
                        <button class="edit">Edit</button>
                    </div>`
                );
            });
            $('#root').after(`
                <div class="next__wrap"><button class="next">Show next</button></div>
            `);
            $('.next').on('click', function () {
                $(".next__wrap").detach();
                getBeers(++page);
            });
        }
    });
}

let page = 1;
getBeers(page);
