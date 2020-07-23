function getBeers(page) {
    $.get(`https://api.punkapi.com/v2/beers?page=${page}&limit=25`, function( list ) {
        if (list.length != 0) {
            list.forEach(beer => {
                $('#beerList').append(`
                    <div class='beer'>
                        <p class='id'>${beer.id}</p>
                        <button class="close" title="Delete"><i class="fas fa-times fa-2x"></i></button>
                        <div class='image'><img src="${beer.image_url}" alt="Beer image"></div>
                        <h2 class='name'>${beer.name}</h2>
                        <p class='description'>${beer.description}</p>
                        <p class='brewers_tips'>${beer.brewers_tips}</p>
                        <button class="edit">Edit</button>
                    </div>`
                );
            });
            $('#root').after(`
                <div class="next__wrap"><button class="next">Show next</button></div>`
            );
            $('.next').on('click', function () {
                $(this).attr("disebled", true).text("Loading...");
                getBeers(++page);
                $(this).parent().detach();
            });
        }
    });
}

getBeers(1);

$('body').on('click', '.close', function () {
    $(this).parents(".beer").detach();
});

$('body').on('click', '.edit', function () {
    let $name = $(this).parents(".beer").find(".name"),
        $description = $(this).parents(".beer").find(".description"),
        name = $name.text(),
        description = $description.text();

    $('.overlay').css("display", "block");
    $('.modal').css("display", "flex");
    $('body').css("overflow", "hidden");

    $('.modal').append(`
        <textarea rows="1" cols="45" class="textarea_name">${name}</textarea>
        <textarea rows="10" cols="45" class="textarea_description">${description}</textarea>
        <button class="applyEdit">Apply edit</button>`
    );
    $('.applyEdit').on('click', function () {
        $name.text($('.textarea_name').val());
        $description.text($('.textarea_description').val());
        $('.overlay').css("display", "none");
        $('.modal').css("display", "none").empty();
        $('body').css("overflow", "unset");
    });
});
