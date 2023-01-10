
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import {getAllClubs, getClubCategory, getCreatedClubs, getUsernameById} from "./services"

auth.onAuthStateChanged((user) => {
    if(user) {
        const userInfo = document.querySelector('.user-info')
        const userData = getUsernameById(user.uid)
        let username = ''
        userData.then((response)=>{
            console.log(response)
            username = response[0].username
            const date = new Date(response[0].created_at)
            userInfo.innerHTML=
            `
            <h3>${response[0].username}</h3>
            <p>${response[0].email}</p>
            <p>User since ${date.getFullYear()}</p>
            `
            
        })
        const clubInfo = document.querySelector('.clubs')
        const clubData = getCreatedClubs(user.uid)

        clubData.then((response) =>{

            let tlp = ''
            console.log(response)
            response.forEach(club => {
                tlp+=
                `
                <div class="club">
                <div class="picture">
                    <img src="${club.urlBanner}">
                    <div class="text-club-container2">
                        <h3>${club.name}</h3>
                        <p>Created by you</p>

                    </div>
                </div>  
            </div>
                
                
                `
                clubInfo.innerHTML=tlp

                
            });

        })
    }else {

    }
    
})


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
    // const section = document.querySelector('.section')
    // section.classList.toggle('active')
    window.location = '../pages/homePage.html';
})

const profileBtn = document.querySelector('.profilePage');

profileBtn.addEventListener('click', () => {
    window.location = '../pages/profilePage.html';
})