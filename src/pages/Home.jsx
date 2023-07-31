import { useAuth0 } from '@auth0/auth0-react'
import styled from '@emotion/styled';
import React, { useEffect } from 'react'
import CommunitiesSidebar from '../components/CommunitiesSidebar';
import QuestionsList from '../components/QuestionsList';
import { useGlobal } from '../context/global';
import Loader from '../components/Loader';

function Home() {

    let { isLoading  , user} = useAuth0();
    let { defaultQuestions , getUserProfileData , getCurrentUserProfileData } = useGlobal();
    


   useEffect(() => {
    getUserProfileData(user?.email);
   } , [user?.email]);
console.log(getCurrentUserProfileData)
    

    return (
        
        isLoading ? <>
            <Loader />
        </> : (
            <WholeApplication>
                {/* <CommunitiesSidebar /> */}
                <QuestionsList />
            </WholeApplication>
        )
    )
}


const WholeApplication = styled.div`
    display: flex;
`

export default Home