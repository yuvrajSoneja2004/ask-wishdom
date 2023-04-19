import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosInstance'
import { useGlobal } from '../context/global'
import Loader from '../components/Loader';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DefaultProfile from '../assets/defaultUser.jpg';
import DefaultBanner from '../assets/defaultBanner.jpg';
function CreateCommunity() {


    let { communityValidation, communtiyValidationData, isLoading } = useGlobal();

    const [questionValue, setQuestionValue] = useState("me")
    const [errorThemeQuestion, setErrorThemeQuestion] = useState({
        color: '#000'
    })
    // Profile image states
    const [inputProfileImage, setInputProfileImage] = useState(null);
    const [inputBannerImage, setInputBannerImage] = useState(null);
    const [base64ProfileImage, setBase64ProfileImage] = useState(DefaultProfile);
    const [base64BannerImage, setBase64BannerImage] = useState(DefaultBanner);

    const handleProfileChange = (e) => {
        const selectedImage = e.target.files[0];

        // Read the contents of the selected image file
        const reader = new FileReader();
        reader.onload = (event) => {
            setBase64ProfileImage(event.target.result);
        };
        reader.readAsDataURL(selectedImage);

        setImage(selectedImage);
    };
    const handleBannerChange = (e) => {
        const selectedImage = e.target.files[0];

        // Read the contents of the selected image file
        const reader = new FileReader();
        reader.onload = (event) => {
            setBase64BannerImage(event.target.result);
        };
        reader.readAsDataURL(selectedImage);

        setImage(selectedImage);
    };

    useEffect(() => {
        communityValidation(questionValue);
    }, [questionValue])


    // const handleProfileUpload = () => {
    //     // Send the base64Image to the server for saving in MongoDB
    //     axios.post('/api/upload', { image: base64Image })
    //       .then(response => {
    //         // Handle response from the server
    //         console.log(response.data);
    //       })
    //       .catch(error => {
    //         // Handle error
    //         console.error(error);
    //       });
    //   };
    const sumbitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <Whole onSubmit={sumbitHandler}>
            <h1>Community name</h1>
            <QuestionTitle placeholder='Enter the Question.' onChange={(e) => {
                setQuestionValue(e.target.value)
            }} value={questionValue} style={errorThemeQuestion} required></QuestionTitle>
            <ValidationMsg>

                <span>{questionValue.length === 0 ? "Enter the name" : <span>{isLoading ? "loading..." : ""}</span>}</span>

                {
                    questionValue.length === 0 ? "" : communtiyValidationData?.isAllowedToCreate ? <div><CheckCircleOutlineIcon /> <span>{communtiyValidationData?.msg}</span></div> : <main><HighlightOffIcon /> <span>{communtiyValidationData?.msg}</span></main>

                }
            </ValidationMsg>
            <CommunityProfile>
                <main>
                    <h1>Select Community Profile Image:</h1>
                    <input type="file" onChange={handleProfileChange} required />
                </main>
                <div>
                    <img src={base64ProfileImage} alt="profilePreview" />
                    <strong>Profile Preview</strong>
                </div>
            </CommunityProfile>
            <ProfileBanner>
                <main>
                    <h1>What About Community Banner?:</h1>
                    <input type="file" onChange={handleBannerChange} required />
                </main>
                <aside>
                    <img src={base64BannerImage} alt="profilePreview" />
                    <strong>Banner Preview</strong>
                </aside>
            </ProfileBanner>
            <CommunityDescription>
                <h1>Write Community Description</h1>
                <textarea required></textarea>
            </CommunityDescription>
        </Whole>
    )
}


const CommunityDescription = styled.div`
margin-top: 80px;
h1 {
    text-shadow: 0px 1px, 1px 0px, 1px 0px;

}
textarea {
border: none;
font-size: 50px;
width: 100%;

:focus {
    border: none;
    outline: none;
}
}
`

const ProfileBanner = styled.div`
display: flex;
align-items: start;
flex-direction: column;
margin-top: 80px;
h1 {
    text-shadow: 0px 1px, 1px 0px, 1px 0px;

}




aside {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
}
aside  img {
    width: 100%;
}
`



const Whole = styled.form`
margin: 30px 100px;
padding: 60px;
background: #f6f9f9;
box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

@media screen and (max-width: 749px){
    padding: 30px;
    margin: 15px ;
}
@media screen and (max-width: 417px){
    padding: 15px;
}

`
const QuestionTitle = styled.textarea`
border: none;
font-size: 50px;
width: 100%;

&&:focus {
    border: none;
    outline: none;
}
`
const AskedBy = styled.div`
display: flex;

div {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
}

margin-bottom: 100px;

img {
    width: 55px;
    border-radius: 50%;
}

`

const CommunityProfile = styled.div`
display: flex;
align-items: center;
margin-top: 80px;
h1 {
    text-shadow: 0px 1px, 1px 0px, 1px 0px;

}
div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    margin-left: 30px;

}
div img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    text-align: center;
    margin-left: 7px;
}
div strong {
    margin-top: 5px;
}

aside {
    display: flex;
    flex-direction: column;
}
aside  img {

    width: 100%;
}
`

const ValidationMsg = styled.div`
div {
    display: flex;
    align-items: center;
    color: #4BB543;
}
main {
    display: flex;
    align-items: center;
    color: #FF0000;
}
span {
    margin-left: 6px;
}
`
export default CreateCommunity