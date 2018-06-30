const tags = [];
const searchTags = [];

const createTags = () => {
    $('#tags').empty();
    tags.forEach(t => {
        const tag = `<div class='tag sort'>${t}</div>`;
        $('#tags').append(tag)
    })
};

$.get('/recipes', data => {
    console.log(data)
    data.forEach((e,i) => {
        console.log(e)
        console.log(i)
        const rec = `
        <div style='background-image:url("${e.images[0]}")' class='recipe-block'>
            <div class='rm-cont'>
                <div class='rm' id='${e._id}'>X</div>
            </div>
            <a id='rec-${i}' class='title' href='/recipes/${e._id}'><div>${e.title}</div></a>
            <div class='tag-cont' id='tags-${i}'></div>
        </div>`
        $('#recipes').append(rec)
        e.tags.forEach(g => {
            console.log(`Tags from db ${g}`)
            g = g.trim();
            tags.indexOf(g) == -1 && tags.push(g);
            const tag = `
            <div class='tag'>${g}</div>`
            $(`#tags-${i}`).append(tag);
        })    
    })
    console.log(tags)
    createTags()
})

$('#tags').on('click','.sort', function(){
    const tag = $(this).text();
    searchTags.indexOf(tag) == -1 && searchTags.push(tag);
    console.log(searchTags)
    const searchString = searchTags.join(',');
    console.log(searchString)
    $.get(`/search?tag=${searchString}`, data => console.log(data))
})

$('body').on('click','.rm', function(){
    const id = $(this).attr('id');
    $.ajax({
        url:`/remove/${id}`,
        type:'DELETE',
        success: function(result){
            console.log(result);
            window.location.reload()
        }

    })
})