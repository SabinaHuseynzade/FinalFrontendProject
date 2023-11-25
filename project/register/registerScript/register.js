let users = [
  {
      name: 'u1',
      password : 'p1',
      phone: '000-000-0000',
      comps : [
          {
              id : 1,
              type: 'Acer',
              name: 'acer1',
              price: 123,
              opinion: 'have',
              new: 'Yes!',
              photo : 'https://www.notebookcheck-ru.com/fileadmin/Notebooks/Acer/Aspire_E5-553G-109A/4zu3_Acer_Aspire_E5_553G_Teaser.jpg',
              fullMemory: '12',
              prosessor: 'core i7',
              notFullMemory: '12',
              typeOfMemory: 'HDD',
              sistem: 'vin 11',
              videoCart: '12'
          },
      ],
  },
];
if(!localStorage.getItem('users')){
    localStorage.setItem('users', JSON.stringify(users))
}
  
$(".place").on("input", function () {
  if (
    $("#name").val().length >= 2 &&
    $("#password").val().length >= 2 &&
    $("#check").is(":checked")
  ) {
    $("#submit").attr("disabled", false);
  } else {
    $("#submit").attr("disabled", true);
  }
});

$("#check").click(function () {
  if (
    $("#name").val().length >= 2 &&
    $("#password").val().length >= 2 &&
    $("#check").is(":checked")
  ) {
    $("#submit").attr("disabled", false);
  } else {
    $("#submit").attr("disabled", true);
  }
});

$("#submit").click(function (event) {
  event.preventDefault();

  users = JSON.parse(localStorage.getItem('users'))

  let newUser = {
    name: $('#name').val(),
    password : $('#password').val(),
    phone : $('#phone').val(),
    comps: []
  }

  let alredyExist = users.some(user => user.name === $('#name').val())

  if(alredyExist){
    alert('This is alredy registered!')
    $('#name').css({
        'outline-color' : 'red',
        'border-color' : 'red'
    })
  } else {
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
  }
});

$('#alert').css('display', 'none')

$("#submit").click(function(){
  $("#alert").css('display', 'inline-block')
  setTimeout(function(){
  $("#alert").css('display', 'none')
  }, 1000);
});

    
