import axios from 'axios';

const API_KEY = '51577392-fe6fcec4f7e04f8f3d5104f81';

export default function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  return axios
    .get('https://pixabay.com/api/', { params })
    .then(response => response.data.hits)
    .catch(error => {
      throw error;
    });
}
