import styled from '@emotion/styled'
import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Typography } from '@mui/material';
function CommunitiesSidebar() {
    return (
        <Whole>
            <CreateCommunityBtn>
                <IconAdd />
                <p>Create Community</p>
            </CreateCommunityBtn>
            <SingleCommunityRows>
                {/* Will map the communities here  */}
                <Typography variant='p'>Sample Static Community</Typography>
            </SingleCommunityRows>

        </Whole>
    )
}


const Whole = styled.div`
width: 300px;
height: 90vh;
background: #F1F2F2;
display: flex;
justify-content: start;
align-items: center;
flex-direction: column;
padding: 20px;
@media screen and (max-width:696px){
    display: none;
  }

`

const IconAdd = styled(AddIcon)`
    
    background: #E6E7E8;
    border-radius: 4px;
    padding: 3px;
`
const SingleCommunityRows = styled.div`
margin-top: 30px;
`
const CreateCommunityBtn = styled.button`

    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ECEDED;
    border-radius: 4px;
    border: none;
    gap: 5px;
    padding: 10px 15px;
  

`




export default CommunitiesSidebar