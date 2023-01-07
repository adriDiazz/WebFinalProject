import axios from 'axios';

export const addClub = async (club, id, username) => {
    const response = await axios.post('http://localhost/products', club);
    console.log(response.data.id);
    const response2 = await axios.post('http://localhost/userclub', {
        club_id: response.data.id,
        user_id: id,
        username: username,
    });

    return { response: response.status === 201, club_id: response.data.id };
};

export const editClub = async (club, id) => {
    const response = await axios.put('http://localhost/products', club);
    return response.status === 201;
};

export const getRandomProfile = () => {
    const randomNum = Math.floor(Math.random() * 10000000);
    return `https://api.multiavatar.com/${randomNum}.svg`;
};

export const getCreatedClubs = async (id) => {
    const response = await axios.get('http://localhost/products');
    return response.data.filter((club) => club.creator === id);
};

export const getJoinedClubs = async (id) => {
    const response = await axios.get('http://localhost/userclub', id);
    const joinedClubs = response.data.map((club) => {
        if (club.user_id === id) {
            return club.club_id;
        }
    });
    console.log(joinedClubs);
    const noNull = joinedClubs.filter((club) => club !== null);
    const clubsResponse = await axios.get('http://localhost/products');
    const clubs = clubsResponse.data;
    return clubs.filter((club) => {
        if (noNull.includes(club.id) && club.creator !== id) {
            return club;
        }
    });
};

export const addUserToDb = async (user) => {
    const response = await axios.post('http://localhost/users', user);
    return response.status === 201;
};

export const getClubUsers = async (id) => {
    const response = await axios.get('http://localhost/userclub', id);
    const clubUsers = response.data.map((club) => {
        if (club.club_id === id) {
            return club.user_id;
        }
    });

    const usersResponse = await axios.get('http://localhost/users');
    const users = usersResponse.data;
    return users.filter((user) => clubUsers.includes(user.id));
};

export const getCategories = async () => {
    const response = await axios.get('http://localhost/category');
    return response.data;
};

export const getMostPopularClubs = async () => {
    const response = await axios.get('http://localhost/userclub');
    let answ = {};
    response.data.forEach((dato) => {
        if (!Object.keys(answ).includes(String(dato.club_id))) {
            answ[dato.club_id] = 1;
        } else {
            answ[dato.club_id] = answ[dato.club_id] + 1;
        }
    });
    const sortable = Object.entries(answ);
    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });
    return sortable;
};

export const getClubById = async (clubId) => {
    const response = await axios.get('http://localhost/products');
    return response.data.filter((club) => club.id === clubId);
};

export const getAllClubs = async () => {
    const response = await axios.get('http://localhost/products');
    return response.data;
};

export const getUsernameById = async (userId) => {
    const response = await axios.get('http://localhost/users');
    return response.data.filter((user) => user.id === userId);
};

export const setCategoryToClub = async (clubId, categoryId) => {
    const response = await axios.post('http://localhost/categoryclub', {
        club_id: clubId,
        category_id: categoryId,
    });
    return response.status === 201;
};

export const getCategoryIdByName = async (categoryName) => {
    const response = await axios.get('http://localhost/category');
    return response.data.filter((category) => category.name === categoryName);
};

export const getClubCategory = async (clubId) => {
    const response = await axios.get('http://localhost/categoryclub');
    const category = response.data.filter(
        (category) =>
            category.club_id === clubId && category.category_id !== null
    );
    const categoryId = category[0].category_id;

    const response2 = await axios.get('http://localhost/category');
    const category2 = response2.data.filter(
        (category) => category.id === categoryId
    );

    return category2[0].name;
};

export const joinUserToClub = async (clubId, userId, username) => {
    const response = await axios.post('http://localhost/userclub', {
        club_id: clubId,
        user_id: userId,
        username: username,
    });
    console.log(response);
    return response.status;
};
