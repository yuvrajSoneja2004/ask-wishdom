import styled from '@emotion/styled';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SiteLogoLight from '../assets/sitelogolight.png';
import { useAuth0 } from '@auth0/auth0-react';
import Dropdown from 'react-bootstrap/Dropdown';
import {AiOutlineUser ,AiOutlineUpload} from 'react-icons/ai';
import {FiUsers} from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi'
import { RedBtn } from '../utils/RedBtn';
import { Link, useNavigate } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AlertDialogSlide from './PostFeedDialogue';

function NavigationBar() {

    let { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    const navigate = useNavigate();


    return (
        <WholeNav collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Logo src={SiteLogoLight} alt='siteLogo' onClick={() => { navigate("/") }} />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2} href="#memes">
                            <Link to='/communities' style={{ textDecoration: 'none', color: '#fff', display: 'flex' , alignItems: 'center' , gap: '5px' }}> <AccountBalanceIcon />  Communities</Link>
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            <Link to='/myProfile/:userEmail' style={{ textDecoration: 'none', color: '#fff', display: 'flex' , alignItems: 'center' , gap: '5px' }}> <AiOutlineUser size={30} />My Profile</Link>
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            <Link to='/allProfiles' style={{ textDecoration: 'none', color: '#fff', display: 'flex' , alignItems: 'center' , gap: '5px' }}> <FiUsers size={30} />All Profiles</Link>
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            <Link to='/postFeed' style={{ textDecoration: 'none', color: '#fff', display: 'flex' , alignItems: 'center' , gap: '5px' }}> <AiOutlineUpload size={30} />Post</Link>
                        </Nav.Link>
                        <AlertDialogSlide />


                        {
                            !isAuthenticated ? <RedBtn variant='contained' onClick={() => { loginWithRedirect() }}>Register</RedBtn> : <UserDropDown >
                                <Dropdown.Toggle id="dropdown-basic" >
                                    <UserProfile src={user.picture} alt='userProfile' />
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ background: 'transperent !important' }} className='myDrop' >
                                    <Dropdown.Item href="#/action-1" onClick={() => { logout() }}> <FiLogOut /> Logout</Dropdown.Item>

                                </Dropdown.Menu>
                            </UserDropDown>
                        }
                        {
                            isAuthenticated ? <RouterLink to='/ask'> <RedBtn variant='contained' style={{display: 'flex' , alignItems: 'center' , gap: '4px'}} >   <QuestionMarkIcon fontSize='500'/>  Ask Something</RedBtn></RouterLink> : ""
                        }

                        {/* <LogoutBtn variant='contained' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</LogoutBtn> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </WholeNav>
    );
}

const Logo = styled.img`
width: 120px;
margin: 10px 0;



`
const RouterLink = styled(Link)`
    margin-top: 5px;
    text-decoration: none;
`

const UserDropDown = styled(Dropdown)`
background: transparent !important;
`

const WholeNav = styled(Navbar)`
    background-color: #000 !important;
`


const UserProfile = styled.img`
border-radius: 50%;
width: 35px;
`

export default NavigationBar;