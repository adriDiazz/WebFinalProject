import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { imgs } from "./constants";
import { getAllClubs, getCategories, getClubById, getMostPopularClubs, getUsernameById, getRandomProfile, getClubCategory} from "./services";
import tippy from "tippy.js";




auth.onAuthStateChanged((user) => {
    if (user) {
        const categoryContainer = document.querySelector('.categories-cointainer');
        const categories = getCategories();
        categories.then(categories => {
            let tlp = '';
            categories.forEach(category => {
                tlp += `
                <div class="category">
                    <img src="../assets/circle.svg" alt="">
                    <p>${category.name}</p>
                </div>
                `
            });
            categoryContainer.innerHTML = tlp;
        })
        
        const topClubs = document.querySelector('.top-clubs');
        const clubs = getMostPopularClubs();
        let tlp = '';
        clubs.then(clubs => {
            clubs.forEach((club, index) => {
                if (index > 3) {
                    return;
                }
                const myclub = getClubById(Number(club[0]))
                myclub.then(info => {
                    console.log(info)
                    tlp += `
                        <div class="item">
                            <div class="picture">
                                <img src="${info[0].urlBanner}" alt="">
                            </div>
                            <div class="text-club-container">
                                
                                    <h3>${index + 1}º</h3>
                                    ${index === 0 ? `<img src="../assets/descarga1.png" alt="" class="trophy">` : ''}
                                    ${index === 1 ? `<img src="../assets/descarga2.png" alt="" class="trophy">` : ''}
                                    ${index === 2 ? `<img src="../assets/descarga3.png" alt="" class="trophy">` : ''}

                                <h3 class="negro titol">${info[0].name}</h3>
                            </div>
                            <button class="btn-transparent">Follow</button>
                        </div>
                    `
                    topClubs.innerHTML = tlp;

                })
                
            })
        })

        const clubesContainer = document.querySelector('.clubes-container');
        const clubes = getAllClubs();
        
        clubes.then(clubes => {
            let tlp = '';
            clubes.forEach(club => {
                const username = getUsernameById(club.creator)
                const  category = getClubCategory(club.id)

                category.then(category => {
                    username.then(nombre => {
                        tlp += `
                            <div class="flip-card">
                            <div class="flip-card-inner">
                            <div class="flip-card-front">
                            <div class="picture">
                            <img src="${club.urlBanner}" alt="">
                            <div class="text-club-container2">
                                <h3>${club.name}</h3>
                                <p>Created By: @ ${nombre[0].username}</p>
                                <p>Category: ${category}</p>
                            </div>
                        </div>
                        </div>
                        <div class="flip-card-back">
                            <p class="description">${club.description}</p>
                            <button class="btn-transparent2" data-popover-target="#popover-target">Join</button>
                            </div>
                            </div>
                        </div>
                        `
                        clubesContainer.innerHTML = tlp;
                    })
                })

            });
            

            
        })
        
        
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
    // const section = document.querySelector('.section')
    // section.classList.toggle('active')
    window.location = '../pages/homePage.html';
})

const profileBtn = document.querySelector('.profilePage');

profileBtn.addEventListener('click', () => {
    window.location = '../pages/profilePage.html';
})


const modal = document.querySelector('.add-modal-top-container')
const modalOpen = document.querySelector('.addPage')

let profileImg

modalOpen.addEventListener('click', () => {
    modal.style.display = 'block'
    const profiles = document.querySelector('.profiles')
    const randomProfile1 = getRandomProfile();
    const randomProfile2 = getRandomProfile();
    const randomProfile3 = getRandomProfile();
    
    profiles.innerHTML = `
    <img src="${randomProfile1}" alt="" class="profileImg">
    <img src="${randomProfile2}" alt="" class="profileImg">
    <img src="${randomProfile3}" alt="" class="profileImg">
    `

    const profileImgs = document.querySelectorAll('.profileImg')
    profileImgs.forEach((img, index) => {
        img.addEventListener('click', () => {
            profileImg = img.getAttribute('src')
            console.log(profileImg)
            if(profileImgs[index].classList.contains('selected')){
                profileImgs[index].classList.remove('selected')
            }
            else{
                profileImgs.forEach(img => {
                    img.classList.remove('selected')
                })
                profileImgs[index].classList.add('selected')
            }

        })
    })
})

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'
    }
})



//ADD MODAL LOGIC

const nameInput = document.querySelector('.name')
const descriptionInput = document.querySelector('.description')
const discordInput = document.querySelector('.discord')
const createBtn = document.querySelector('.createBtn')

createBtn.addEventListener('click', () => {
    const name = nameInput.value
    const description = descriptionInput.value
    const discord = discordInput.value
    const banner = profileImg 

    if (name === '' || description === '' || discord === '' || banner === undefined) {
        alert('Please fill in all fields')
    } else {

        const club = {
            name,
            description,
            discord,
            urlBanner : banner,
            creator : auth.currentUser.uid,
            createdAt : new Date()
        }

        const saveClub = addClub(club, auth.currentUser.uid, "username")
        if (saveClub) {
            alert('Club created')
            modal.style.display = 'none'
            window.location.reload()
        }
    }
})

