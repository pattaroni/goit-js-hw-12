import axios from 'axios';

const API_KEY = '51577392-fe6fcec4f7e04f8f3d5104f81';
const MY_URL = 'https://pixabay.com/api/';

export default async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '15',
    page: page,
  };

  const response = await axios.get(MY_URL, { params });
  return response.data;
}
