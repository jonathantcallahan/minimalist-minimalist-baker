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
        $('body').append(rec)
        e.tags.forEach(g => {
            console.log(g);
            console.log(i)
            console.log(`#rec-${i}`)
            const tag = `
            <div class='tag'>${g}</div>`
            $(`#tags-${i}`).append(tag)
        })    
    })
        
})
