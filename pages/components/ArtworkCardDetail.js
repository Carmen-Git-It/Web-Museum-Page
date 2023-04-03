import useSWR from 'swr';
import Error from 'next/error';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useAtom} from 'jotai';
import {favouritesAtom} from '@/store';
import {useState, useEffect} from 'react';
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function ArtworkCardDetail(objectID){
    objectID = objectID.objectID;

    const [favourites, setFavourites] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favourites?.includes(objectID))
    }, [favourites]);
    

    async function favouritesClicked() {
        if(showAdded) {
            setFavourites(await removeFromFavourites(objectID));
            setShowAdded(false);
        } else {
            setFavourites(await addToFavourites(objectID));
            setShowAdded(true);
        }
    }

    // Fetch data from the API
    const {data, error} = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null);

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
           <Button variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>+ Favourite {showAdded ? " (added)" : ""}</Button>
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

