import React, { useEffect } from 'react'
import { useGlobal } from '../context/global';
import CommunityCard from '../components/CommunityCard';
import styled from '@emotion/styled';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

function Communities() {

    let { getCommunities, allCommunities } = useGlobal();

    useEffect(() => {
        getCommunities();
    }, [allCommunities])

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
`
const Whole = styled.div`
    padding: 80px;
    h1 {
        margin-bottom: 90px;
        font-weight: bolder;
        text-shadow: 0px 1px, 1px 0px, 1px 0px;
        text-transform: capitalize;
        color: #b92b27;

    }
`


export default Communities