const id = window.location.href.split('/')
console.log(id[4])

$( document ).ready(function(){

    let images = [];
    let currentImg = 0;
    $.get(`/recipe-info/${id[4]}`, data => {
        console.log(data)
        images = data.images
        $('#food-img').attr('src',data.images[0])
    })

    $('.scroll').click(function(){
        const imgLen = images.length;
        const dir = $(this).attr('id')
        const food = $('#food-img');
        const left = $('#left');
        const right = $('#right');
        dir === 'right' ? currentImg++ : currentImg-- ;
        food.attr('src',images[currentImg]);
        currentImg > 0 ? left.css('visibility','visible') : left.css('visibility','hidden')
        currentImg === imgLen -1 ? right.css('visibility','hidden') : right.css('visibility','visible');

        $(this).css('width','40px').css('height','40px')
        setTimeout(() => { $(this).css('width','30px').css('height','30px')},350)
    })
})

