$( document ).ready(function(){
    $('#add').click(function(){
        $('#stat-img').attr('src','https://cdn.dribbble.com/users/614270/screenshots/2534654/loader01.gif')
        $('#stat').text('Loading Recipe')
        const body = {
            url: $('#rurl').val()
        };
        console.log(body);
        $.post('/addrecipe',body, data => {
            if(data.title.length < 1){
                $('#stat-img').attr('src','https://i.giphy.com/media/OiC5BKaPVLl60/200w.webp')
                $('#stat').text('Oops! Something went wrong. Please make sure the link you entered is from minimalistbaker.com')
                return
            } else {
                $('#stat-img').attr('src',data.images[0])
                $('#stat').text('Recipe Successfully Added!')
            }
        })
    })
})
