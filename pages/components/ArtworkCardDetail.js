import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';

export default function ArtworkCardDetail(objectID){
    objectID = objectID.objectID;
    // Fetch data from the API
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);

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

    let wiki = <></>;

    if (data.hasOwnProperty('artistDisplayName') && data.artistDisplayName.length > 0) {
        wiki = <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">wiki</a>
    }

    console.log(data);

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
                    <strong>Artist:</strong> {data.hasOwnProperty('artistDisplayName') && data.artistDisplayName.length > 0 ? data.artistDisplayName : "N/A"} 
                        {data.hasOwnProperty('artistDisplayName') && data.artistDisplayName.length > 0 ? "(" : ""}{wiki}{data.hasOwnProperty('artistDisplayName') && data.artistDisplayName.length > 0 ? ")" : ""}
                    <br />

                </Card.Text>
            </Card.Body>
        </Card>
    );
}

