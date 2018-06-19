$( document ).ready(function(){
    $('#add').click(function(){
        const body = {
            url: $('#rurl').val()
        };
        console.log(body);
        $.post('/addrecipe',body, data => {
            console.log(data)
        })
    })
})