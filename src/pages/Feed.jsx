import styled from '@emotion/styled'
import React , {useState} from 'react'
import FeedCard from '../components/FeedCard'
import { ReactCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';






function Feed() {
  return (
   <Divider>
    <FeedSection>  
        <FeedCard />
    </FeedSection>
    <AlsoFollowBar>
        <h1>You may also follow</h1>
    </AlsoFollowBar>
   </Divider>
  )
}




















const Divider = styled.div`
    display: grid;
    grid-template-columns: 73% auto;
`


const FeedSection = styled.div`
border: 2px solid green;
padding: 0 70px;
`
const AlsoFollowBar = styled.div`
border: 2px solid red;
`
export default Feed