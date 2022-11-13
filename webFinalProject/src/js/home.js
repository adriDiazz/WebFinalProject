import { auth } from "./firebase";
import { signOut } from "firebase/auth";


auth.onAuthStateChanged((user) => {
    if (user) {

    } else {
        console.log('no user')
        window.location = '../../index.html';
    }
});


const btnLogOut = document.querySelector('.logoutBtn');

btnLogOut.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('user signed out')
        window.location = '../../index.html';
    }).catch((error) => {
        console.log(error)
    })
})

const searchBtn = document.querySelector('.clubesPage');

searchBtn.addEventListener('click', () => {
    window.location = '../pages/clubPage.html';
});

const homeBtn = document.querySelector('.homePage');

homeBtn.addEventListener('click', () => {
    window.location = '../pages/homePage.html';
})

const profileBtn = document.querySelector('.profilePage');

profileBtn.addEventListener('click', () => {
    window.location = '../pages/profilePage.html';
})


const modal = document.querySelector('.add-modal-top-container')
const modalOpen = document.querySelector('.addPage')

modalOpen.addEventListener('click', () => {
    modal.style.display = 'block'
})

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'
    }
})

