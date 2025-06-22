import axios from 'axios';

export const getCharacters = async (page: number) => {
  const res = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
  return res.data;
};

export const getCharacterById = async (id: number) => {
  const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
  return res.data;
};