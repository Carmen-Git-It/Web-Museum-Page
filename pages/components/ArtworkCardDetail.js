import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';

export default function ArtworkCardDetail(objectID){
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
    
    let img = <></>;

    if (data.hasOwnProperty('primaryImageSmall')){
        img = <Card.Img variant="top" src={data.primaryImageSmall}/>
    }

    let artist = <></>;

    if (data.hasOwnProperty('artistDisplayName')) {
        wiki = <a target="_blank" rel="noreferrer" href={data.artistWikidata_URL}>wiki</a>
    }

    return (
        <Card className="bg-light">
           {img}
            <Card.Body>
                <Card.Title>
                    {data.hasOwnProperty('title') ? data.title : "N/A"}
                </Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {data.hasOwnProperty('objectDate') ? data.objectDate: "N/A"}
                    <br/>
                    <strong>Classification:</strong> {data.hasOwnProperty('classification') ? data.classification : "N/A"}
                    <br />
                    <strong>Medium:</strong> {data.hasOwnProperty('medium') ? data.medium : "N/A"}
                    <br />
                    <br />
                    <strong>Artist:</strong> {data.hasOwnProperty('artistDisplayName') ? data.artistDisplayName : "N/A"} 
                        {data.hasOwnProprty('artistDisplayName') ? "(" : ""}{wiki}{data.hasOwnProprty('artistDisplayName') ? ")" : ""}
                    <br />

                </Card.Text>
            </Card.Body>
        </Card>
    );
}

