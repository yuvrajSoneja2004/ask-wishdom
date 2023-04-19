import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosInstance'
import { useGlobal } from '../context/global'
import Loader from '../components/Loader';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DefaultProfile from '../assets/defaultUser.jpg';
import DefaultBanner from '../assets/defaultBanner.jpg';
import { NavLink } from 'react-router-dom';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined';
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined';
import { useAuth0 } from '@auth0/auth0-react';
function CreateCommunity() {


    let { communityValidation, communtiyValidationData, isLoading } = useGlobal();
    const [tempCategory, setTempCategory] = useState("others");
    const [questionValue, setQuestionValue] = useState("me")
    const [errorThemeQuestion, setErrorThemeQuestion] = useState({
        color: '#000'
    })

    let { user } = useAuth0();


    // Profile image states
    const [inputProfileImage, setInputProfileImage] = useState(null);
    const [inputBannerImage, setInputBannerImage] = useState(null);
    const [base64ProfileImage, setBase64ProfileImage] = useState(DefaultProfile);
    const [base64BannerImage, setBase64BannerImage] = useState(DefaultBanner);
    const [desc, setDesc] = useState("");

    const handleProfileChange = (e) => {
        const selectedImage = e.target.files[0];

        // Read the contents of the selected image file
        const reader = new FileReader();
        reader.onload = (event) => {
            setBase64ProfileImage(event.target.result);
        };
        reader.readAsDataURL(selectedImage);

        setInputProfileImage(selectedImage);
    };
    const handleBannerChange = (e) => {
        const selectedImage = e.target.files[0];

        // Read the contents of the selected image file
        const reader = new FileReader();
        reader.onload = (event) => {
            setBase64BannerImage(event.target.result);
        };
        reader.readAsDataURL(selectedImage);

        setInputBannerImage(selectedImage);
    };

    // const getAllCommunities = async (req, res) => {
    //     try {
    //         await axiosInstance.get("")
    //     } catch (error) {

    //     }
    // }

    useEffect(() => {
        // getAllCommunities();
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
    const sumbitHandler = async (e) => {
        e.preventDefault();
        try {
            let date = new Date();
            let theRes = await axiosInstance.post(`/createCommunity`, {
                name: questionValue,
                profilePicture: base64ProfileImage,
                bannerPicture: base64BannerImage,
                desc: desc,
                commCategory: tempCategory,
                dateCreated: date.toDateString(),
                communityCreator: {
                    name: user.name,
                    email: user.email,

                }
            })
            console.log(theRes)
        } catch (error) {
            console.log("Error from client side while creating a community. cause :", error);
        }
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
                <textarea required value={desc} onChange={(e) => {
                    setDesc(e.target.value)
                }}></textarea>
            </CommunityDescription>
            <AskCategory> <h3>Category:</h3>
                <div>
                    <CategoryLink to={"/createCommunity"} onClick={() => setTempCategory("gaming")}>  <SportsEsportsOutlinedIcon /> Gaming</CategoryLink>
                    <CategoryLink to={"/createCommunity"} onClick={() => setTempCategory("fashion")}>  <CheckroomOutlinedIcon /> Fashion</CategoryLink>
                    <CategoryLink to={"/createCommunity"} onClick={() => setTempCategory("computer-science")}>  <CodeOutlinedIcon /> Computer Science</CategoryLink>
                    <CategoryLink to={"/createCommunity"} onClick={() => setTempCategory("fitness")}>  <FitnessCenterOutlinedIcon /> Fitness</CategoryLink>
                    <CategoryLink to={"/createCommunity"} onClick={() => setTempCategory("tech")}>  <PhoneAndroidOutlinedIcon /> Tech</CategoryLink>
                    <CategoryLink to={"/createCommunity"} onClick={() => setTempCategory("doubts")}>  <HelpOutlineOutlinedIcon /> Doubts</CategoryLink>
                    <CategoryLink to={"/createCommunity"} onClick={() => setTempCategory("others")}>  <AddReactionOutlinedIcon /> Others</CategoryLink>
                </div>

            </AskCategory>
            <button type='submit'>Submit</button>
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
const CategoryLink = styled(NavLink)`
    color: #000;
    text-decoration: none;
    border: 2px solid black;
    padding: 8px 15px;
    font-size: 14px;
    border-radius: 20px;
    font-weight: bolder;

    &&:active , &&:focus {
        color: #b92b27 !important;
        border: 2px solid #b92b27;
    }
`
const AskCategory = styled.div`
display: flex;
align-items: center;

div {
    margin-left: 10px;
    margin-top: -10px;
    display: flex;
    flex-wrap: wrap;
    column-gap: 6px;
}
h3 {
    display: inline;
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