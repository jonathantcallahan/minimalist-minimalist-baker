alert('yoo')

$.get('/recipes', data => {
    console.log(data)
    data.forEach(e => {
        const rec = `
        <div>${e.title}</div>
        <img style='width:100px' src=${e.images[0]}>
        `
        $('body').append(rec)
    })
})