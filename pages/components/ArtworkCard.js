import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

export default function ArtworkCart(objectID){
    // Fetch data from the API
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher);

    if (error) {
        return (
            <Error statusCode={404}/>
        );
    }

    if (!data || data == []){
        return null;
    }

    return (
        <Card className="bg-light">
            <Card.Img variant="top" src={data.hasOwnProperty('primaryImageSmall') ? 
                data.primaryImageSmall : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"}/>
            <Card.Body>
                <Card.Title>
                    {data.hasOwnProperty('title') ? data.title : "N/A"}
                </Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {data.hasOwnProperty('objectDate') ? data.objectDate : "N/A"}
                    <br/>
                    <strong>Classification:</strong> {data.hasOwnProperty('classification') ? data.classification : "N/A"}
                    <br />
                    <strong>Medium:</strong> {data.hasOwnProperty('medium') ? data.medium : "N/A"}
                    <br />
                    <br />
                </Card.Text>
                <Link href={`/artwork/${objectID}`} passHref><Button variant="link"><strong>ID:</strong> {objectID}</Button></Link>
            </Card.Body>
        </Card>
    );
}

