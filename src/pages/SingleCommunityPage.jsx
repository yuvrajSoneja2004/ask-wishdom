import styled from '@emotion/styled';
import React from 'react'
import { useParams } from 'react-router-dom'

function SingleCommunityPage() {

    let { communityID } = useParams();

    return (
        <Whole>
            <Poster style={{ background: `url(https://images.pexels.com/photos/13576342/pexels-photo-13576342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <div><section>
                    <img src="https://images.pexels.com/photos/11631883/pexels-photo-11631883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                </section>

                    <Details>
                        <h3>hhgggggggggggggggggggggggggg</h3>
                    </Details>

                </div>

            </Poster>
        </Whole>
    )
}


const Whole = styled.div``;
const Details = styled.main`
width: 100px;
/* min-height: 100px; */
`;

const Poster = styled.div`
width: 100%;
min-height: 300px;
background-repeat: no-repeat;
background-position: center;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;

section {
    border-radius: 50%;
    min-width: 200px;
    height: 200px;
}
div {
    min-width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: green;
    transform: translateY(50%);

    img {
        border-radius: 50%;
        padding: 5px;
        object-fit: cover;
        width: 100%;
    height: 100%;
    }
}
`
export default SingleCommunityPage