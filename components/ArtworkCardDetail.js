import { Card, Button } from 'react-bootstrap'
import Error from 'next/error';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from "react";

export default function ArtworkCardDetail({ objectID }) {

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {

    if (favouritesList.includes(objectID)) {

      setShowAdded(true);

    } else {

      setShowAdded(false);

    }
  }, [favouritesList]);

  function favouritesClicked() {

    if (showAdded == true) {

        setFavouritesList(current => current.filter(fav => fav != objectID));
        setShowAdded(false);

    } else {

        setFavouritesList(current => [...current, objectID]);
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

                    {data.objectDate ? (
                        <p><b>Date:</b> {data.objectDate}</p>
                    ) : (
                        <p><b>Date:</b> N/A</p>
                    )}

                    {data.classification ? (
                        <p><b>Classification:</b> {data.classification}</p>
                    ) : (
                        <p><b>Classification:</b> N/A</p>
                    )}

                    {data.medium ? (
                        <p><b>Medium:</b> {data.medium}</p>
                    ) : (
                        <p><b>Medium:</b> N/A</p>
                    )}

                </Card.Text>

                <br />
                <br />

                <Card.Text>

                    {data.artistDisplayName ? (
                        <div>
                            <p><b>Artist:</b> {data.artistDisplayName} ( <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" > wiki</a> ) </p>
                        </div>
                    ) : (
                        <p><b>Artist:</b> N/A</p>
                    )}

                    {data.creditLine ? (
                        <p><b>Credit Line:</b> {data.creditLine}</p>
                    ) : (
                        <p><b>Credit Line:</b> N/A</p>
                    )}

                    {data.dimensions ? (
                        <p><b>Dimensions:</b> {data.dimensions}</p>
                    ) : (
                        <p><b>Dimensions:</b> N/A</p>
                    )}

                    <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}> {showAdded ? "+ Favourite (added)" : "+ Favourite"} </Button>   

                </Card.Text>
            </Card.Body>
        </Card>
    )
}