import { useAuth0 } from '@auth0/auth0-react';
import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'
import React from 'react';
import SiteLogo from '../assets/sitelogo.png';
import { useGlobal } from '../context/global';
import Reg from '../assets/regMan.gif'



function Register() {

    let { loginWithRedirect } = useAuth0();

    return (
        <WholeBx style={{ background: `url(./assets/registerBg.jpeg)`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <Content>



                <Logo src={SiteLogo} alt='logo' width={130} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                    <img src={Reg} alt="" width={300} />
                    <strong>Ask anything , anytime you want!</strong>

                    <div>
                        <RegisterBtn variant='contained' onClick={() => { loginWithRedirect() }}>Register</RegisterBtn>
                    </div>
                </div>

            </Content>

        </WholeBx>
    )
}

const WholeBx = styled.div`
height: 100vh;
width: 100%;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
`
const Content = styled.div`
background:  #fff;
width: 600px;
height: 520px;
display: flex;
justify-content: space-between;
padding: 60px 0;
align-items: center;
flex-direction: column;
border-radius: 5px;


`

const RegisterBtn = styled(Button)`
background-color: #b92b27;
&&:hover {
    background-color: #b13634;
}

`

const Logo = styled.img`
    
`


export default Register