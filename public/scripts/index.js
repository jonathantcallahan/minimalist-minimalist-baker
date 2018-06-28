$.get('/recipes', data => {
    console.log(data)
    data.forEach((e,i) => {
        console.log(e)
        const rec = `
        <div class='recipe-block'>
            <a href='/recipes/${e._id}'><div class='title' id='rec-${i}'>${e.title}</div></a>
            <img src='${e.images[0]}'>
        </div>`
        $('body').append(rec)    
    })
        
})
