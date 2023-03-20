import { Card, Button, ListGroup } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import styles from '@/styles/History.module.css';

export default function History() {

    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

    let parsedHistory = [];

    searchHistory.forEach(h => {

        let params = new URLSearchParams(h);
        let entries = params.entries();
        parsedHistory.push(Object.fromEntries(entries));

    });

    function historyClicked(e, index) {

        e.preventDefault();
        router.push(`/artwork?${searchHistory[index]}`);

    }

    function removeHistoryClicked(e, index) {

        e.stopPropagation(); // stop the event from trigging other events

        setSearchHistory(current => {

            let x = [...current];
            x.splice(index, 1)
            return x;

        });
    }

    return (
        <>
            <ListGroup>
                {parsedHistory.length > 0 ? (
                    parsedHistory.map((historyItem, index) => (
                        <ListGroup.Item onClick={(e) => historyClicked(e, index)} className={styles.historyListItem}>
                            {Object.keys(historyItem).map(key => (<>{key}: <strong>{historyItem[key]}</strong>&nbsp;</>))}
                            <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, index)}>&times;</Button>
                        </ListGroup.Item>
                    ))
                ) : (
                    <Card className="text-center">
                        <Card.Body>
                            <h4>Nothing Here</h4>
                            Try searching for some artwork.
                        </Card.Body>
                    </Card>
                )}
            </ListGroup>
        </>
    )
}