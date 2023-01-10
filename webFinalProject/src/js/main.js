import { modal } from "./modal";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";



const btnContainer = document.querySelector('.nav-btn-container');



auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user)
        btnContainer.innerHTML = `
        <div class="user-container" style={
            display: flex;
            align-items: center;
            justify-content: center;
        }>
            <p>${user.email}</p>
        </div>
        <button class="logoutBtn btn-transparent">Logout</button>
        `
        const logoutBtn = document.querySelector('.logoutBtn');
        logoutBtn.addEventListener('click', () => {
            signOut(auth).then(() => {
                console.log('user signed out')
            }).catch((error) => {
                console.log(error)
            })
        })


        
        setTimeout(() => {
            window.location = '../pages/homePage.html';
        }, 1000)
        
    } else {
        console.log('no user')
        btnContainer.innerHTML = `
        <button class="btn loginBtn">Log in</button>
        <button class="btn-black sing-up">Sign up <img src="./assets/addUser.svg" alt="add user icon"></button>
        `
        modal();

        const navMobileToggle = document.querySelector('.fa');


    }
});




















