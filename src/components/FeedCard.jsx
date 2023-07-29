import styled from '@emotion/styled'
import React from 'react';

// Icon Imports 
import {AiFillHeart , AiOutlineHeart ,} from 'react-icons/ai';
import {BiBookmark} from 'react-icons/bi'

function FeedCard() {
  return (
    <Card>
        {/* upper row details */}
       <div>
       <ProfilePic><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg/220px-John_Doe%2C_born_John_Nommensen_Duchac.jpg" alt="" />
        
        
        </ProfilePic>
        <span>john_doe_69</span>
        <label>• 2h</label>
       </div>
       {/* the uploaded media details */}
       <UploadedMedia></UploadedMedia>
       {/* Lower row details */}
       <LowerRow>
        <div>
           <section>
           <AiOutlineHeart size={30}/>
           <br />
           <span>60</span>
           </section>
        </div>
    <BiBookmark size={30} />
       </LowerRow>
        <div>
        <Desc>
       
        <p> <span style={{marginRight: '4px'}}>john_doe_69</span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur, reiciendis?</p>
        </Desc>
        </div>
    </Card>
  )
}




const Desc = styled.div`
    margin-top: 12px;
    display: flex;
    align-items: flex-start;
    p {
        font-size: 14px;
        font-weight: 500;
        margin-left: 3px;
    }
`


const LowerRow = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
        

        section {
            text-align: center;
        }
    }
`

const UploadedMedia = styled.div`
    height: 500px;
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
    background-color: grey;

`

const Card = styled.div`
padding: 10px 0;
div {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
        font-size: 14px;
        font-weight: bolder;
        margin-left: 3px;
    }
    label {
        font-size: 14px;
        margin-left: 2px;
        font-weight: bold;
        color: #8b8b8b;
    }
}

`
const ProfilePic = styled.div`
display: flex;
align-items: center;
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;

}

width: 40px;
border-radius: 50%;
height: 40px;

`
export default FeedCard