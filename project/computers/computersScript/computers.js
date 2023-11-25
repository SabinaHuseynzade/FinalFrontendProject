const users = JSON.parse(localStorage.getItem('users'))
const currentUser = localStorage.getItem('currentUser')

let comps = users.find(user => user.name === currentUser).comps

let edit = false

function updateSite(){
    $('tbody').html('')

    for(let comp of comps){
        $('tbody').html( $('tbody').html() + `
        <tr>
            <td>${comp.id}</td>
            <td>${comp.type}</td>
            <td><div  data-bs-toggle="modal" data-bs-target="#myModalImg" ><img src='${comp.photo}' class="comp" id="idForImgForModal" alt="comp"></div></td>
            <td>${comp.price}AZN</td>
            <td>
            <button id="${comp.id}D" class="btn">Delete</button>
            <button  data-bs-toggle='modal' data-bs-target='#exampleModal' id="${comp.id}E"class="btn">Edit</button>
            </td>
        </tr>`)
    }
    
}
function makeModalNull(){
    $('#type').val('Acer')
    $('#name').val('')
    $('#price').val('')
    $('#opinion').val('')
    $('#new').val('Yes!')
    $('#photo').val('')
    $('#fullMemory').val('')
    $('#prosessor').val('')
    $('#notFullMemory').val('')
    $('#typeOfMemory').val('HDD')
    $('#sistem').val('')
    $('#videoCart').val('')
}


updateSite()


$('#photo').on('input', function(){
    $('#photoOfComp').attr('src', $(this).val())
})

$('#clearModal').click(function(){
    makeModalNull()
    
})

$('#save-comp').click(function(){
    if(!edit){
        let newComp = {
            id: comps.length === 0 ? 1 : comps.at(-1).id + 1,
            type: $('#type').val(),
            name:  $('#name').val(),
            price: $('#price').val(),
            opinion: $('#opinion').val(),
            new: $('#new').val(),
            photo: $('#photo').val(),
            fullMemory: $('#fullMemory').val(),
            prosessor: $('#prosessor').val(),
            notFullMemory: $('#notFullMemory').val(),
            typeOfMemory: $('#typeOfMemory').val(),
            sistem: $('#sistem').val(),
            videoCart: $('#videoCart').val()
                      

   
        }
    
    
        comps.push(newComp)
        
        makeModalNull()
        
    
        users.find(user => user.name === currentUser).comps = comps
    
        localStorage.setItem('users', JSON.stringify(users))
        updateSite()
    }else{
        edit = false
        const index = comps.findIndex(comp => comp.id + 'E' === id) 
        comps[index] = {
            id: comps[index].id,
            type: $('#type').val(),
            name:  $('#name').val(),
            price: $('#price').val(),
            opinion: $('#opinion').val(),
            new: $('#new').val(),
            photo: $('#photo').val(),
            fullMemory: $('#fullMemory').val(),
            prosessor: $('#prosessor').val(),
            notFullMemory: $('#notFullMemory').val(),
            typeOfMemory: $('#typeOfMemory').val(),
            sistem: $('#sistem').val(),
            videoCart: $('#videoCart').val()
        }
        users.find(user => user.name === currentUser).comps = comps
    
        localStorage.setItem('users', JSON.stringify(users))
        updateSite()
    }
})


let id

$('table').click(function(e){
    if(e.target.innerHTML === 'Delete'){
        let a = confirm('Are you sure?')

        if (a) { 
            id =  e.target.id
            comps = comps.filter(comp => comp.id + 'D' !== id)
        
            users.find(user => user.name === currentUser).comps = comps
        
        
            localStorage.setItem('users', JSON.stringify(users))
            updateSite()
        }

    }else if(e.target.innerHTML === 'Edit'){
        edit = true
        id =  e.target.id
        const currentComp = comps.find(comp => comp.id + 'E' === id)

        $('#type').val(currentComp.type)
        $('#name').val(currentComp.name)
        $('#price').val(currentComp.price)
        $('#opinion').val(currentComp.opinion)
        $('#new').val(currentComp.new)
        $('#photo').val(currentComp.photo)
        $('#fullMemory').val(currentComp.fullMemory)
        $('#prosessor').val(currentComp.prosessor)
        $('#notFullMemory').val(currentComp.notFullMemory)
        $('#typeOfMemory').val(currentComp.typeOfMemory)
        $('#sistem').val(currentComp.sistem)
        $('#videoCart').val(currentComp.videoCart)

    }
    
})

$("#idForImgForModal").click(function(){
    let src = $(this).attr('src')

    $('#imgForModal').attr('src', src)
})