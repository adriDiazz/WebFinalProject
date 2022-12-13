import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { addUserToDb } from "./services";
import axios from "axios";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const modal = () => {
    const modal = document.querySelector('.login-modal-top-container')
    const modalClose = document.querySelector('.close')
    const modalOpen = document.querySelector('.loginBtn')
    const signIn = document.querySelector('.sing-up')
    const formContainer = document.querySelector('.form-container')



    modalOpen.addEventListener('click', () => {
        modal.style.display = 'block'
        formContainer.innerHTML = `
        <div class="login-logo-container">
            <img src="./assets/logo.png" alt="logo" />
            <h1>Cluby</h1>
        </div>
        <input type="email" name="email" id="email" placeholder="Email" class="email"/>
        <input type="password" name="password" id="password" placeholder="Password" class="password"/>
        <button type="submit" class="btn-black loginModal">Log in</button>
        <p>Dont have an account yet? <a href=""><u>Register here</u></a></p>
        <button class="btn-black"><img src="./assets/google.svg" alt="google"> Sign in with google</button>
        `

        const loginBtn = document.querySelector('.loginModal');
        const email = document.querySelector('.email');
        const password = document.querySelector('.password');

        

        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    const modal = document.querySelector('.login-modal-top-container')
                    modal.style.display = 'none'
                    window.location = '../pages/homePage.html';
                })
                .catch((error) => {
                    Toastify({
                        text: error.message,
                        position: "center", 
                        style: {
                            background: "#ff6961",
                          }
                      }).showToast();
                });
        })
        
    })

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none'
    })

    signIn.addEventListener('click', () => {
        modal.style.display = 'block'
        formContainer.innerHTML = `
            <div class="login-logo-container">
                <img src="./assets/logo.png" alt="logo" />
                <h1>Cluby</h1>
            </div>
            <input type="email" name="email" id="email" placeholder="Email" class="email"/>
            <input type="text" name="username" id="username" placeholder="Username" class="username"/>
            <input type="password" name="password" id="password" placeholder="Password" class="password"/>
            <input type="password" name="password" id="passwordConfirm" placeholder="Confirm Password" class="password confirm"/>
            <button type="submit" class="btn-black RegisterModal">Register</button>
            <p>have an account? <a href=""><u>Log in</u></a></p>
            <button class="btn-black"><img src="./assets/google.svg" alt="google"> Sign in with google</button>
        `
        const registerBtn = document.querySelector('.RegisterModal');
        const email = document.querySelector('.email');
        const password = document.querySelector('.password');
        const username = document.querySelector('.username');
        const confirm = document.querySelector('.confirm');

        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if(password.value !== confirm.value){
                Toastify({
                    text: "Password does not match",
                    position: "center", 
                    style: {
                        background: "#ff6961",
                      }
                  }).showToast();
                return
            }
            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    const modal = document.querySelector('.login-modal-top-container')
                    const user = {
                        "id": userCredential.user.uid.toString(),
                        "username": username.value,
                        "created_at": new Date().toISOString(),
                        "email": userCredential.user.email.toString()
                    }

                    const added = addUserToDb(user)
                    if(added){
                        modal.style.display = 'none'
                    }

                })
                .catch((error) => {
                    Toastify({
                        text: error.message,
                        position: "center", 
                        style: {
                            background: "#ff6961",
                          }
                      }).showToast();                
                });
        })
    })

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'
        }
    })
}
