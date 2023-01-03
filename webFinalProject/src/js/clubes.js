import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { imgs } from "./constants";
import { getAllClubs, getCategories, getClubById, getMostPopularClubs, getUsernameById } from "./services";


auth.onAuthStateChanged((user) => {
    if (user) {
        const categoryContainer = document.querySelector('.categories-cointainer');
        const categories = getCategories();
        categories.then(categories => {
            let tlp = '';
            categories.forEach(category => {
                tlp += `
                <div class="category">
                    <img src="${imgs[category.name]}" alt="">
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
                                    ${index === 0 ? `<img src="../assets/descarga1.png" alt="" width="40px">` : ''}
                                    ${index === 1 ? `<img src="../assets/descarga2.png" alt="" width="40px">` : ''}
                                    ${index === 2 ? `<img src="../assets/descarga3.png" alt="" width="40px">` : ''}

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
                username.then(nombre => {
                    console.log(nombre)
                    tlp += `
                    <div class="club2">
                        <div class="picture">
                            <img src="${club.urlBanner}" alt="">
                        </div>
                        <div class="text-club-container2">
                            <h3>${club.name}</h3>
                            <p>@ ${nombre[0].username}</p>
                        </div>
                        <button class="btn-transparent">Follow</button>
                    </div>
                    `
                    clubesContainer.innerHTML = tlp;
                })
            });
            
        })
        
        
    } else {
        console.log('no user')
        window.location = '../../index.html';
    }
});




