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
            <a id='rec-${i}' class='title' href='/recipes/${e._id}'><div>${e.title}</div></a>
            <div class='tag-cont' id='tags-${i}'></div>
        </div>`
        $('#recipes').append(rec)
        e.tags.forEach(g => {
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
})