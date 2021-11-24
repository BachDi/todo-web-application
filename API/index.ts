import axios from "axios";
import { ELocalStorageKeys } from 'constants/enum';
import { IHeader } from './constants';

export const api = axios.create({
  baseURL:  process.env.API_URL,
});

export function auth(): IHeader {
  if (typeof window === 'undefined') {
    return {}
  }

  const headers = { authorization: '' }
  const tokenKey = ELocalStorageKeys.ACCESS_TOKEN
  const accessToken = localStorage.getItem(tokenKey) ?? (sessionStorage.getItem(tokenKey) || '')
  headers.authorization = `Bearer ${accessToken}`

  return headers
}
