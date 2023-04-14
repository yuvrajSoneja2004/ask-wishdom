import styled from '@emotion/styled';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SiteLogoLight from '../assets/sitelogolight.png';
import { useAuth0 } from '@auth0/auth0-react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FiLogOut } from 'react-icons/fi'
import { RedBtn } from '../utils/RedBtn';
import { Link } from 'react-router-dom';


function NavigationBar() {

    let { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();


    return (
        <WholeNav collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Logo src={SiteLogoLight} alt='siteLogo' />
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>


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
                            isAuthenticated ? <RouterLink to='/ask'> <RedBtn variant='contained' >Ask Something</RedBtn></RouterLink> : ""
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