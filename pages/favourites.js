import { Card, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import ArtworkCard from '@/components/ArtworkCard.js';

export default function Favourites() {

    const [favouritesList] = useAtom(favouritesAtom);

    return (
        <>
            <Row className="gy-4">
                {favouritesList.length > 0 ? (
                    favouritesList.map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))
                ) : (
                    <Card className="text-center">
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            Try adding some new artwork to the list.
                        </Card.Body>
                    </Card>
                )}
            </Row>
        </>
    )
}