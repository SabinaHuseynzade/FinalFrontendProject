const users = JSON.parse(localStorage.getItem('users')) || [];
const allTabPanes = document.querySelectorAll('.tab-pane');

function loadContentForTab(tabPaneType) {
  $('#tabSwitchSpinner').show();

  return new Promise(resolve => {
    setTimeout(() => {
      $('#tabSwitchSpinner').hide();

      let compsHtml = '';

      for (let user of users) {
        if (user.comps) {
          for (let comp of user.comps) {
            if (tabPaneType.toUpperCase() === comp.type.toUpperCase()) {
              const userPhone = user.phone || 'N/A';

              compsHtml += `<div class="col-md-3 mb-3 my-3 "> 
                <div class="card computer h-100">
                  <img class="card-img-top" src="${comp.photo}" alt="comp">
                  <div class="card-body">
                    <p class="card-text">Name: ${comp.name}</p>
                    <p class="card-text">Opinion: ${comp.opinion}</p>
                    <p class="card-text">Price: ${comp.price}</p>
                    <p class="card-text">New: ${comp.new}</p>
                    <p class="card-text">Phone: ${userPhone}</p>
                    <button class="btn moreBTN" data-bs-toggle="modal" data-bs-target="#moreModal" data-id="${comp.id}">More</button>
                  </div>
                </div>
              </div>`;
            }
          }
        }
      }

      if (compsHtml === '') {
        compsHtml = `
          <p class="no fade-in-shadow">There are no computers</p>`;
      }

      const tabPane = $(`#${tabPaneType}`);
      tabPane.html(`<div class="row">${compsHtml}</div>`);

      resolve();
    }, 1000);
  });
}


document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', function () {
    const tabPaneType = link.getAttribute('data-bs-target').substring(1);
    loadContentForTab(tabPaneType);
  });
});

const firstTabPaneType = document.querySelector('.nav-link').getAttribute('data-bs-target').substring(1);
loadContentForTab(firstTabPaneType);


document.querySelectorAll('.tab-content').forEach((btn) => {
  btn.addEventListener('click', (event) => {
    if (event.target.classList.contains('moreBTN')) {
      const compId = event.target.getAttribute('data-id');
      const selectedComp = getCompById(compId);
      const selectedUser = getUserByCompId(compId);

      if (selectedComp) {
        const modalBody = document.getElementById('moreModalBody');

        modalBody.innerHTML = `<img src="${selectedComp.photo}" alt="comp" class="size">
        <p>Name: ${selectedComp.name}</p>
        <p>Opinion: ${selectedComp.opinion}</p>
        <p>Price: ${selectedComp.price}</p>
        <p>Phone: ${selectedUser ? selectedUser.phone : 'N/A'}</p>
        <p>Memoryfull: ${selectedComp.fullMemory}</p>
        <p>Memorynotfull: ${selectedComp.notFullMemory}</p>
        <p>Memorytype: ${selectedComp.typeOfMemory}</p>
        <p>Processor: ${selectedComp.prosessor}</p>
        <p>System: ${selectedComp.sistem}</p>
        <p>Video Card: ${selectedComp.videoCart}</p>`;
      }
    }
  });
});

function getUserByCompId(compId) {
  for (let user of users) {
    if (user.comps && user.comps.some(comp => comp.id === parseInt(compId))) {
      return user;
    }
  }
  return null;
}


function getCompById(compId) {
  for (let user of users) {
    if (user.comps) {
      const foundComp = user.comps.find(comp => comp.id === parseInt(compId));
      if (foundComp) {
        return foundComp;
      }
    }
  }
  return null;
}


$('#searchInput').on('keyup', function (event) {
  if (event.key === 'Enter') {
      let searchText = $(this).val().toUpperCase();

      $('.nav-link').each(function () {
          let tabPaneId = $(this).attr('data-bs-target');
          let tabPane = $(tabPaneId);

          if (tabPane.length > 0) {
              let tabPaneType = tabPaneId.substring(1); 
              if (tabPaneType.toUpperCase() === searchText) {
                  $(this).tab('show');
                  return false; 
              }
          }
      });
  }
});

