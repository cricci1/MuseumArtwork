import { getToken } from "./authenticate.js";

export async function addtoFavourites(id) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': 'JWT ' + getToken(),
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {

      return data;

    } else {

      return [];

    }
}

export async function removefromFavourites(id) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': 'JWT ' + getToken(),
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {

      return data;

    } else {

      return [];

    }
}

export async function getFavourites() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': 'JWT ' + getToken(),
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {

      return data;

    } else {

      return [];

    }
}

export async function addtoHistory(id) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'authorization': 'JWT ' + getToken(),
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {

      return data;

    } else {

      return [];

    }
}

export async function removefromHistory(id) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': 'JWT ' + getToken(),
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {

      return data;

    } else {

      return [];

    }
}

export async function getHistory() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': 'JWT ' + getToken(),
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {

      return data;

    } else {

      return [];

    }
}