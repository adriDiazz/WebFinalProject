import { auth } from "./firebase";
import { signOut } from "firebase/auth";





auth.onAuthStateChanged((user) => {
    if (user) {
        const btnContainer = document.querySelector('.nav-btn-container');
        btnContainer.innerHTML = `
        <div class="user-container"}>
            <p>${user.email}</p>
        </div>
        <button class="logoutBtn btn-transparent">Logout</button>
        `
        const btnLogOut = document.querySelector('.logoutBtn');

        btnLogOut.addEventListener('click', () => {
            signOut(auth).then(() => {
                console.log('user signed out')
                window.location = '../../index.html';
            }).catch((error) => {
                console.log(error)
            })
        })
        
    } else {
        console.log('no user')
        window.location = '../../index.html';
    }
});




