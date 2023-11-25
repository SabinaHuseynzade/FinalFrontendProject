const currentUser = localStorage.getItem('currentUser')

if(currentUser){
    $("#alert").css('display', 'block')
    setTimeout(function(){
    $("#alert").css('display', 'none')
    }, 1000);
    let prevText = $('h1').text()
    $('h1').text(prevText + currentUser)
    $('#login').css('display', 'none')
    $('#logout').css('display', 'inline-block')
    $('#comps').show()
} else {
    $("#alert").css('display', 'none')
    $('#login').show()
    $('#logout').hide()
    $('#comps').hide()
}

$('#logout').click(function(){
    $('h1').text('User name: ')
    $('#logout').css('display', 'none')
    $('#login').css('display', 'inline-block')
    $('#comps').hide()
    localStorage.removeItem('currentUser')
})

