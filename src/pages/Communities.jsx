import React, { useEffect } from 'react'
import { useGlobal } from '../context/global';
import CommunityCard from '../components/CommunityCard';
import styled from '@emotion/styled';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import Loader from '../components/Loader';

function Communities() {

    let { getCommunities, allCommunities, allCommunitiesLoading } = useGlobal();

    useEffect(() => {
        getCommunities();
    }, [allCommunities])


    if (allCommunitiesLoading) {
        return <Loader />
    }

    return (
        <Whole>
            <h1> <Smily />  Join your favourite community today!</h1>
            <Grid>
                {
                    allCommunities.map((comm, i) => {
                        return <CommunityCard data={comm} key={i} />
                    })
                }
            </Grid>
        </Whole>
    )
}


const Smily = styled(SentimentVerySatisfiedIcon)`
    font-size: 70px;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    place-items: center;
    gap: 100px;
    @media screen and (max-width: 1217px){
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 850px){
        grid-template-columns: 1fr;
    }
`
const Whole = styled.div`
    padding: 80px;
    @media screen and (max-width: 421px){
            padding: 30px;
        }
    h1 {
        margin-bottom: 90px;
        font-weight: bolder;
        text-shadow: 0px 1px, 1px 0px, 1px 0px;
        text-transform: capitalize;
        color: #b92b27;

        @media screen and (max-width: 441px){
            font-size: 20px;
        }
        

    }
`


export default Communities