const id = window.location.href.split('/')
console.log(id[4])

let images = [];
let currentImg = 0;
$.get(`/recipe-info/${id[4]}`, data => {
    console.log(data)
    images = data.images
    $('#food-img').attr('src',data.images[0])
})