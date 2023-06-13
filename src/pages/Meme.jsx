import styled from '@emotion/styled'
import React from 'react'

function Meme() {
  return (
    <Whole style={{height: '100vh' , width: '100%'}}>
        <h1>Nobody reads this.</h1>
        <img src="https://media.giphy.com/media/jt34LHEVIsbs0Qlbi2/giphy.gif" alt="" />
        
    </Whole>
  )
}

const Whole = styled.div`
display: grid;
place-items: center;
    img {
        height: 50%;
        width: 80%;
    }
`
export default Meme