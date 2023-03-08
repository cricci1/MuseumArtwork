import { Button, Card } from 'react-bootstrap'
import Link from 'next/link';
import Error from 'next/error';
import useSWR from 'swr';

export default function ArtworkCard({objectID}) {

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

    if (error) {

        return <Error statusCode={404} />;

    }

    if (!data) {

        return null;

    }

    return (
        <Card>

            {data.primaryImageSmall ? (
                <Card.Img variant="top" src={data.primaryImageSmall} />
            ) : (
                <Card.Img variant="top" src="https://via.placeholder.com/375x375.png?text=[+Not+Available+]" />
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

                <Link href={`/artwork/${objectID}`} passHref><Button variant="primary"><strong>ID:</strong> {objectID}</Button></Link>

            </Card.Body>
        </Card>
    )
}