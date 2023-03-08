import { useRouter } from 'next/router';
import { Row, Col } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetail.js'

export default function ArtworkID() {

    const router = useRouter();
    const { objectID } = router.query;

    return (
        <>
            <Row>
                <Col>
                    <ArtworkCardDetail objectID={objectID} />
                </Col>
            </Row>
        </>
    )
}