import axios from "axios"

export const addClub = async(club, id, username) => {
    const response = await axios.post("http://localhost/products", club)
    const response2 = await axios.post("http://localhost/userclub", {club_id: response.data.id, user_id: id, username: username})

    return response2.status === 201
}   

export const editClub = async(club, id) => {
    const response = await axios.put("http://localhost/products", club)
    return response.status === 201
}   

export const getRandomProfile = () => {
    const randomNum = Math.floor(Math.random() * 10000000)
    return `https://api.multiavatar.com/${randomNum}.svg`
}

export const getCreatedClubs = async(id) => {
    const response = await axios.get("http://localhost/products")
    console.log(response)
    return response.data.filter(club => club.creator === id)
}

export const getJoinedClubs = async(id) => {
    const response = await axios.get("http://localhost/userclub", id)
    const joinedClubs = response.data.map(club => {
        if (club.user_id === id ) {
            return club.club_id
        }

    })
    console.log(joinedClubs)
    const noNull = joinedClubs.filter(club => club !== null)
    const clubsResponse = await axios.get("http://localhost/products")
    const clubs = clubsResponse.data
    return clubs.filter(club => {
        if (noNull.includes(club.id) && club.creator !== id) {
            return club
        }
    })
}

export const addUserToDb = async(user) => {
    const response = await axios.post("http://localhost/users", user)
    return response.status === 201
}

export const getClubUsers = async(id) => {
    const response = await axios.get("http://localhost/userclub", id)
    const clubUsers = response.data.map(club => {
        if (club.club_id === id) {
            return club.user_id
        }

    })
    
    const usersResponse = await axios.get("http://localhost/users")
    const users = usersResponse.data
    return users.filter(user => clubUsers.includes(user.id))
}
