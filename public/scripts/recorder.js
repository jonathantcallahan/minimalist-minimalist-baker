$( document ).ready(function(){
    $('#add').click(function(){
        const body = {
            url: $('#rurl').val()
        };
        console.log(body);
        $.post('/addrecipe',body, data => {
            console.log(data)
            $('body').append(data.ingredients)
            data.images.forEach(e => {
                const img = `<img style='width:200px' src='${e}'>`
                $('body').append(img)
            })
        })
    })
})