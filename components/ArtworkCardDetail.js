import { Card, Button } from 'react-bootstrap'
import Error from 'next/error';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from "react";
import { addtoFavourites, removefromFavourites } from '@/lib/userData.js';

export default function ArtworkCardDetail({ objectID }) {

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(()=>{

        setShowAdded(favouritesList?.includes(objectID))

    }, [favouritesList])
    
  async function favouritesClicked() {

    if (showAdded == true) {

        setFavouritesList(await removefromFavourites(objectID)) 
        setShowAdded(false);

    } else {

        setFavouritesList(await addtoFavourites(objectID))
        setShowAdded(true);

    }
  }

    if (error) {

        return <Error statusCode={404} />;

    }

    if (!data) {

        return null;

    }

    return (
        <Card>

            {data.primaryImage && (
                <Card.Img variant="top" src={data.primaryImage} />
            )}

            <Card.Body>

                {data.title ? (
                    <Card.Title>{data.title}</Card.Title>
                ) : (
                    <Card.Title>N/A</Card.Title>
                )}

                <Card.Text>

                {data.objectDate ? <><b>Date:</b> {data.objectDate}<br/></> : <><b>Date:</b> N/A<br/></>}
                {data.classification ? <><b>Classification:</b> {data.classification}<br/></> : <><b>Classification:</b> N/A<br/></>}
                {data.medium ? <><b>Medium:</b> {data.medium}<br/></> : <><b>Medium:</b> N/A<br/></>}

                </Card.Text>

                <br />

                <Card.Text>

                    {data.artistDisplayName ? <><b>Artist:</b> {data.artistDisplayName}<br/></> : <><b>Artist:</b> N/A<br/></>}
                    {data.creditLine ? <><b>Credit Line:</b> {data.creditLine}<br/></> : <><b>Credit Line:</b> N/A<br/></>}
                    {data.dimensions ? <><b>Dimensions:</b> {data.dimensions}<br/></> : <><b>Dimensions:</b> N/A<br/></>}

                    <br />

                    <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}> {showAdded ? "+ Favourite (added)" : "+ Favourite"} </Button>   

                </Card.Text>
                
            </Card.Body>
        </Card>
    )
}