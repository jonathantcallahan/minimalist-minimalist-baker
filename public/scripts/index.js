alert('yoo')

$.get('/recipes', data => {
    console.log(data)
    data.forEach((e,i) => {
        console.log(e)
        const rec = `
        <div id='rec-${i}'>${e.title}</div>
        `
        })
        $('body').append(rec)
    })
})