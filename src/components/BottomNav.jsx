import styled from '@emotion/styled'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function BottomNav() {
    return (
        <Whole>
            <Bx>
                <Bubble>
                    <IconHome />
                    <p>Home</p>
                </Bubble>
            </Bx>
            <Bx>
                <Bubble>
                    <CommunityIcon />
                    <p>Communities</p>

                </Bubble>
            </Bx>
            <Bx>
                <Bubble>
                    <UserIcon />
                    <p>Account</p>
                </Bubble>
            </Bx>
        </Whole>
    )
}


const Whole = styled.div`
width: 100%;
height: 71px;
display: none;
background-color: #fff;
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
overflow: hidden;
position: fixed;
bottom: 0;


  @media screen and (max-width:696px){
    display: flex;
    justify-content: space-evenly;

  }
`

const Bx = styled.div`
p {
    font-size: 16px;
}
`
const IconHome = styled(HomeIcon)`
font-size: 30px;
`
const CommunityIcon = styled(PeopleIcon)`
font-size: 30px;
`
const Bubble = styled(IconButton)`
display: flex;
flex-direction: column;
`
const UserIcon = styled(AccountCircleIcon)`
font-size: 30px;
`
export default BottomNav