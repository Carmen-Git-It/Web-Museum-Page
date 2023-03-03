import {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Pagination from 'react-bootstrap/Pagination';
import ArtworkCard from '../components/ArtworkCard';

const PER_PAGE = 12;

export default function ArtworkIndex(){
    const [artworkList, setArtworkList] = useState();
    const [page, setPage] = useState(1);

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    //const fetcher = (url) => fetch(url).then((res) => res.json());
    const {data, error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

    function previousPage(){
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function nextPage(){
        if (page < artworkList.length) {
            setPage(page + 1);
        }
    }

    useEffect(() => {
        if (data) {
            let results = [];
            for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE){
                const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
                results.push(chunk);
            }
            setArtworkList(results);
            setPage(1);
        }
    }, [data]);

    if (error) {
        return (
            <Error statusCode={404}/>
        );
    }

    if (artworkList && artworkList.length > 0){   
        let artworks = [];
        artworkList[page - 1].forEach((artwork) => {
            artworks.push(
                <Col lg={3} eventKey={artwork} key={artwork}>
                    <ArtworkCard objectID={Number(artwork)}/>
                </Col>
            );
        });

        console.log(artworks);

        return (
            <>
                <Row className="gy-4">
                    {artworks}
                </Row>
                <Row>
                    <Col>
                        <Pagination>
                            <Pagination.Prev onClick={previousPage}/>
                            <Pagination.Item>{page}</Pagination.Item>
                            <Pagination.Next onClick={nextPage}/>
                        </Pagination>
                    </Col>
                </Row>
            </>
        );
    }  else if (!artworkList) {
        return null;
    }   else {
        return (
            <Card>
                <Card.Body>
                    <Card.Text>
                        <h4>Nothing Here</h4> Try searching for something else.
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}