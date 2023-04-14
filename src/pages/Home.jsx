import { useAuth0 } from '@auth0/auth0-react'
import styled from '@emotion/styled';
import React from 'react'
import CommunitiesSidebar from '../components/CommunitiesSidebar';
import QuestionsList from '../components/QuestionsList';

function Home() {

    let { isLoading } = useAuth0();
    return (
        isLoading ? <>
            loaidng....
        </> : (
            <WholeApplication>
                <CommunitiesSidebar />
                <QuestionsList />
            </WholeApplication>
        )
    )
}


const WholeApplication = styled.div`
    display: flex;
`

export default Home