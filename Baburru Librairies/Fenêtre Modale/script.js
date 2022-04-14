const modal = document.querySelector('#modal1')
const openModal = document.querySelector('.open-modal')
const closeModal = document.querySelector('.close-modal')

openModal.addEventListener('click', () => {
    modal.showModal();
})

closeModal.addEventListener('click', () =>  {
    modal.close();
} )