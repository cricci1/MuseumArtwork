import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from '../lib/authenticate';
import { favouritesAtom, searchHistoryAtom } from '@/store.js';
import { useAtom } from 'jotai';
import { getFavourites, getHistory } from '@/lib/userData';

const PUBLIC_PATHS = ['/login', '/', '/register', '/_error'];

export default function RouteGuard(props) {

    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    async function updateAtoms(){

        setFavouritesList(await getFavourites()); 
        setSearchHistory(await getHistory()); 
    
    }
    

    useEffect(() => {

        updateAtoms();
        authCheck(router.pathname);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeComplete', authCheck);
        }

    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }

    return (
      <>
        {authorized && props.children}
      </>
    )
}