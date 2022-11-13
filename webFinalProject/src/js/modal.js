import { auth } from "./firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


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

        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            signInWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    const modal = document.querySelector('.login-modal-top-container')
                    modal.style.display = 'none'
                    window.location = '../pages/homePage.html';
                })
                .catch((error) => {
                    console.log(error);
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
            <input type="password" name="password" id="password" placeholder="Password" class="password"/>
            <input type="password" name="password" id="passwordConfirm" placeholder="Confirm Password" class="password confirm"/>
            <button type="submit" class="btn-black RegisterModal">Register</button>
            <p>have an account? <a href=""><u>Log in</u></a></p>
            <button class="btn-black"><img src="./assets/google.svg" alt="google"> Sign in with google</button>
        `
        const registerBtn = document.querySelector('.RegisterModal');

        registerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            createUserWithEmailAndPassword(auth, email.value, password.value)
                .then((userCredential) => {
                    const modal = document.querySelector('.login-modal-top-container')
                    modal.style.display = 'none'
                })
                .catch((error) => {
                    console.log(error);
                });
        })
    })

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none'
        }
    })
}
