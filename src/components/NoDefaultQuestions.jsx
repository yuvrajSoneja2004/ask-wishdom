import styled from '@emotion/styled'
import React from 'react';
import PIC from '../assets/no-default-questions.jpg';
import { RedBtn } from '../utils/RedBtn';
import { useNavigate } from 'react-router-dom';

function NoDefaultQuestions() {
    let n = useNavigate();
  return (
    <Whole>
    <img src={PIC} alt="" />
    <h1>No Questions Available</h1>
    <BeFirst onClick={() => {n("/ask")}}>Be first one to ask!</BeFirst>
    </Whole>
  )
}


const BeFirst = styled(RedBtn)`
    
`

const Whole = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
        width: 30vw;
    }
`

export default NoDefaultQuestions