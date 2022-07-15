import axios from 'axios';

export const PinataApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_PINATA_API,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + process.env.NEXT_PUBLIC_PINATA_TOKEN,
    },
  })