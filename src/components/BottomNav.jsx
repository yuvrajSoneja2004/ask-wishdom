import styled from '@emotion/styled'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
function BottomNav() {
    return (
        <Whole>
            <Bx to={"/"}>
                <Bubble>
                    <IconHome />
                    <p>Home</p>
                </Bubble>
            </Bx>
            <Bx to={"/userCommunities"}>
                <Bubble>
                    <CommunityIcon />
                    <p>My Communities</p>

                </Bubble>
            </Bx>
            <Bx to={"/ask"}>
                <Bubble>
                    <UserIcon />
                    <p>Ask</p>
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

const Bx = styled(Link)`

text-decoration: none;
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