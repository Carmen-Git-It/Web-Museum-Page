import {useAtom} from 'jotai';
import { searchHistoryAtom } from '@/store';
import {useRouter} from 'next/router';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import styles from '../styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History(){
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();

  if (!searchHistory){
    return null;
  }

  let parsedHistory = [];

  searchHistory.forEach(href => {
    let params = new URLSearchParams(href);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    const href = `/artwork?${searchHistory[index]}`;
    router.push(href);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  if (parsedHistory.length === 0) {
    return (
      <Card>
      <Card.Body>
          <Card.Text>
              <h4>Nothing Here</h4> Try searching for some artwork.
          </Card.Text>
      </Card.Body>
      </Card>
    );
  }

  let historyListGroupItems = [];
  for (let i = 0; i < parsedHistory.length; i++){
    historyListGroupItems.push(
      <ListGroup.Item onClick={e => historyClicked(e, i)} className={styles.historyListItem}>
        {Object.keys(parsedHistory[i]).map(key => (<>{key}: <strong>{parsedHistory[i][key]}</strong>&nbsp;</>))}
        <Button className="float-end" variant="danger" size="sm" onClick={e => removeHistoryClicked(e, i)}>&times;</Button>
      </ListGroup.Item>
    );
  }

  return (
    <Card>
      <Card.Title>
        Search History
      </Card.Title>
      <Card.Body>
        <ListGroup>
          {historyListGroupItems}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}