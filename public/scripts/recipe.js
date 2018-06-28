const id = window.location.href.split('/')
console.log(id[4])
$.get(`/recipe-info/${id[4]}`, data => {
    console.log(data)
})