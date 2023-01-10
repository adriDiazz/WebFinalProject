import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { addClub, deleteClub, deleteUserFromClub, editClub, getCategoryIdByName, setCategoryToClub } from "./services"
import { getCreatedClubs, getJoinedClubs, getRandomProfile , getClubUsers} from "./services"
import axios from "axios";


auth.onAuthStateChanged((user) => {
    if (user) {
        //Getting the created clubs
        console.log(user)
        const clubsContainer = document.querySelector('.myclubs-clubs-contaiener')
        const myclubs = getCreatedClubs(user.uid);
        myclubs.then((clubs) => {
            let html = '';
            clubs.forEach(club => {
                html += `               
            <div class="myclub createdClub">
                <p>${club.name}</p>
            </div>`

            })

            clubs.length > 0 ? clubsContainer.innerHTML = html : clubsContainer.innerHTML = `<p>You have not created any clubs yet</p>`

            const myclubBtns = document.querySelectorAll('.myclub');
            const myclubBtns2 = document.querySelectorAll('.joinedClub');
            myclubBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    
                    const club = clubs.find((club) => club.name === btn.innerText)

                    btn.classList.add('selectedBtn')

                    myclubBtns.forEach((button) => {
                        if(button !== btn){
                            button.classList.remove('selectedBtn')
                        }


                        myclubBtns2.forEach((button) => {
                            if (button.classList.contains('selectedBtn')) {
                                button.classList.remove('selectedBtn')
                            }
                        })
                    })


                    no.classList.add('nos')
                    no.classList.remove('no')

                    const clubUsers = getClubUsers(club.id).then((users) => {
                        const nos = document.querySelector('.nos')
                        let tpl = ''
                        users.forEach((user) => {
                            tpl += `
                            <div class="member">
                                <img src="../assets/face.svg" alt="">
                                <div class="member-info">
                                    <p>${user.username}</p>
                                    <p class="role">President</p>
                                </div>
                            </div>
                            `
                        })



                        nos.innerHTML = `
                        <div class="club-container">
                            <div class="btn-info-container">
                                <button class="btn-black info-btn">Info</button>
                            </div>

                            <div class="chat-container">

                            </div>
                            <div class="input-container">
                                <input type="text" name="message" id="message" placeholder="Type a message" class="message"/>
                                <button type="submit" class="btn-black send-btn">Send</button>
                            </div>
                        
                        </div>

                        <div class="members-top-container">
                        <div class="members-container">
                            <h2>Members</h2>
                            ${tpl}
                            </div>
                        </div>
                    </div>
                        `
                        const clubContainer = document.querySelector('.club-container')
                        const infoBtn = document.querySelector('.info-btn')
                        console.log(infoBtn)
                        infoBtn.addEventListener('click', () => {
                            const members = document.querySelector('.members-top-container')
                            members.style.display = 'none'
                            clubContainer.innerHTML = `

                            <div class="askModal">
                            <div class="askModal-content">
                                <p>Are you sure you want to leave this club?</p>
                                <div class="askModal-btns">
                                    <button class="btn-black yes-btn">Yes</button>
                                    <button class="btn-black no-btn">No</button>
                                </div>
                            </div>
                        </div>

                            <div class="content-container">                            
                                <div class="club-info-container">
                                    <div class="btn-info-container">
                                        <button class="btn-black edit-btn">Edit</button>
                                    </div>
                                    <h2 class="title">${club.name}</h2>
                                    <p>${club.description}</p>
                                    <h3>Where we meet?</h3>
                                    <p>${club.meet}</p>
                                    <h3>When we meet?</h3>
                                    <p>Monday: 16</p>
                                    <p>Tuesday: 16</p>
                                    <p>Wednesday: 16</p>
                                    <h3>Discord</h3>
                                    <a href="${club.discord}" class="a2" target=”_blank”>${club.discord}</a>
                                    <button class="delete-btn">Delete</button>
                                </div>
                            <div/>
                            `
                            const editBtn = document.querySelector('.edit-btn')
                            editBtn.addEventListener('click', () => {
                                clubContainer.innerHTML = `
                                <div class="form-container2 editable">
                                    <h2>Edit club</h2>
                                    <form class="edit-form2">
                                            <label for="cname" class="label"><input type="text" id="cname" name="cname" placeholder="Club name"></label>
                                            <label for="cdescription" class="label"><textarea id="cdescription" name="cdescription" placeholder="Description"></textarea></label>
                                            <label for="cmeet" class="label"><textarea id="cmeet" name="cmeet" placeholder="Where we meet?"></textarea></label>
                                            <label for="cdiscord" class="label"><input type="text" id="cdiscord" name="cdiscord" placeholder="Discord"></label>
                                            <button type="button" class="btn-black put-edit-btn">Edit</button>
                                    </form>                                    
                                </div>
                                `
                                const putEditBtn = document.querySelector('.put-edit-btn')
                                console.log(document.querySelector('#cdescription').value)
                                putEditBtn.addEventListener('click', () => {
                                    let clubName = document.querySelector('#cname').value
                                    let clubDescription = document.querySelector('#cdescription').value
                                    let clubMeet = document.querySelector('#cmeet').value
                                    let clubDiscord = document.querySelector('#cdiscord').value
                                    clubName === '' ? clubName = club.name : ''
                                    clubDescription === '' ? clubDescription = club.description : ''
                                    clubMeet === '' ? clubMeet = club.meet : ''
                                    clubDiscord === '' ? clubDiscord = club.discord : '' 
                                    const editedClub = {
                                        id: club.id,
                                        name: clubName,
                                        description: clubDescription,
                                        meet: clubMeet,
                                        discord: clubDiscord,
                                    }
                                    const editedClubResult = editClub(editedClub, auth.currentUser.uid)
                                    if (editedClubResult) {
                                        alert('Club edited')
                                        window.location.reload()
                                    }
                                })
                            })

                            const deleteBtn = document.querySelector('.delete-btn')
                            const askModal = document.querySelector('.askModal')

                            deleteBtn.addEventListener('click', () => {
                                //const deleteClubResult = deleteUserFromClub(Number(club.id), user.uid)
                                askModal.classList.add('activao')
                                const yesBtn = document.querySelector('.yes-btn')
                                const noBtn = document.querySelector('.no-btn')

                                yesBtn.addEventListener('click', () => {
                                    const deleteClubResult = deleteClub(Number(club.id))
                                    deleteClubResult.then((result) => {
                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 1000)
                                    })
                                })

                                noBtn.addEventListener('click', () => {
                                    askModal.classList.remove('activao')
                                })

                                
                            })
                        })
                    })
                    const section = document.querySelector('.section')
                    section.classList.remove('active')

                })
                
            })
           
        })



        
        //getting the joined clubs
        const joinedClubsContainer = document.querySelector('.joined-clubs-contaiener')
        const no = document.querySelector('.no')
        const joinedclubs = getJoinedClubs(user.uid);
        joinedclubs.then((clubs) => {
            console.log(clubs)
            let html = ''

            clubs.forEach((club) => {
                html += `
                <div class="myclub joinedClub">
                    <p>${club.name}</p>
                </div>`
            })

            clubs.length > 0 ? joinedClubsContainer.innerHTML = html : joinedClubsContainer.innerHTML = `<p>You have not joined any clubs yet</p>`

            const myclubBtns2 = document.querySelectorAll('.myclub')
            const myclubBtns = document.querySelectorAll('.joinedClub')
            myclubBtns.forEach((btn) => {
                btn.addEventListener('click', () => {
                    
                    const club = clubs.find((club) => club.name === btn.innerText)

                    

                    myclubBtns.forEach((button) => {
                        if(button.classList.contains('selectedBtn')){
                            button.classList.remove('selectedBtn')
                        }

                        btn.classList.add('selectedBtn')



                        myclubBtns2.forEach((button) => {
                            if (button.classList.contains('selectedBtn')) {
                                button.classList.remove('selectedBtn')
                            }
                        })
                    })


                    no.classList.add('nos')
                    no.classList.remove('no')

                    const clubUsers = getClubUsers(club.id).then((users) => {
                        const nos = document.querySelector('.nos')
                        let tpl = ''
                        users.forEach((user) => {
                            tpl += `
                            <div class="member">
                                <img src="../assets/face.svg" alt="">
                                <div class="member-info">
                                    <p>${user.username}</p>
                                    <p class="role">${user.id === club.creator ? 'President' : 'Member'}</p>
                                </div>
                            </div>
                            `
                        })



                        nos.innerHTML = `
                        <div class="club-container">
                            <div class="btn-info-container">
                                <button class="btn-black info-btn">Info</button>
                            </div>

                            <div class="chat-container">

                            </div>
                            <div class="input-container">
                                <input type="text" name="message" id="message" placeholder="Type a message" class="message"/>
                                <button type="submit" class="btn-black send-btn">Send</button>
                            </div>
                        
                        </div>

                        <div class="members-top-container">
                        <div class="members-container">
                            <h2>Members</h2>
                            ${tpl}
                            </div>
                        </div>
                    </div>
                        `
                        const clubContainer = document.querySelector('.club-container')
                        const infoBtn = document.querySelector('.info-btn')
                        console.log(infoBtn)
                        infoBtn.addEventListener('click', () => {
                            const members = document.querySelector('.members-top-container')
                            members.style.display = 'none'
                            clubContainer.innerHTML = `
                            <div class="askModal">
                                <div class="askModal-content">
                                    <p>Are you sure you want to leave this club?</p>
                                    <div class="askModal-btns">
                                        <button class="btn-black yes-btn">Yes</button>
                                        <button class="btn-black no-btn">No</button>
                                    </div>
                                </div>
                            </div>
                            <div class="content-container">
                                <div class="club-info-container">
                                    <div class="btn-info-container">
                                        
                                    </div>
                                    <h2 class="title">${club.name}</h2>
                                    <p>${club.description}</p>
                                    <h3>Where we meet?</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam reiciendis quaerat eaque earum. Delectus earum sint modi impedit non perspiciatis placeat laboriosam, debitis id quia culpa? Vero voluptate dolores non!</p>
                                    <h3>When we meet?</h3>
                                    <p>Monday: 16</p>
                                    <p>Tuesday: 16</p>
                                    <p>Wednesday: 16</p>
                                    <h3>Discord</h3>
                                    <a href="${club.discord}" class="a2" target=”_blank”>${club.discord}</a>
                                    <button class="delete-btn">Leave</button>
                                </div>
                            <div/>
                            `

                            const deleteBtn = document.querySelector('.delete-btn')
                            const askModal = document.querySelector('.askModal')

                            deleteBtn.addEventListener('click', () => {
                                //const deleteClubResult = deleteUserFromClub(Number(club.id), user.uid)
                                askModal.classList.add('activao')
                                const yesBtn = document.querySelector('.yes-btn')
                                const noBtn = document.querySelector('.no-btn')

                                yesBtn.addEventListener('click', () => {
                                    const deleteClubResult = deleteUserFromClub(Number(club.id), user.uid)
                                    deleteClubResult.then((result) => {
                                        window.location.reload()
                                    })
                                })

                                noBtn.addEventListener('click', () => {
                                    askModal.classList.remove('activao')
                                })

                                
                            })
                        })
                    })


                })
            })
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
    const section = document.querySelector('.section')
    section.classList.toggle('active')
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

    console.log(select.value)

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
const select = document.querySelector('.select')


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
        saveClub.then((data) => {
            console.log(data)
            if (data.response) {
                const selectedCategory = select.value
                const categryId = getCategoryIdByName(selectedCategory)
                categryId.then((data2) => {
                    console.log(data2[0].id)
                    const posted = setCategoryToClub(Number(data.club_id), data2[0].id)
                    alert('Club created')
                    modal.style.display = 'none'
                    setTimeout(() => {
                        window.location.reload()
                    }, 500)
                })
            }
        })



        
    }
})




