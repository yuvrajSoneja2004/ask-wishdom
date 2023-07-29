import styled from '@emotion/styled'
import React , {useState} from 'react'
import FeedCard from '../components/FeedCard'
import { ReactCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css';
import './ImageUploadAndCrop.css';
import Modal from 'react-modal';





function Feed() {
  return (
   <Divider>
    <FeedSection>  
        <FeedCard />
    </FeedSection>
    <AlsoFollowBar>
        <h1>You may also follow</h1>
    </AlsoFollowBar>
    <ImageUploadAndCrop />
   </Divider>
  )
}


// Testing Crop 

const ImageUploadAndCrop = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [crop, setCrop] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [showCropModal, setShowCropModal] = useState(false);
  
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result);
          setCrop({ unit: '%', width: 30, aspect: 16 / 9 });
          setShowCropModal(true);
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  
    const handleCropChange = (crop) => {
      setCrop(crop);
    };
  
    const handleImageCrop = () => {
      if (selectedImage) {
        getCroppedImg(selectedImage, crop, (croppedImg) => {
          setCroppedImage(croppedImg);
          setShowCropModal(false);
        });
      }
    };
  
    const getCroppedImg = (imageSrc, crop, callback) => {
      const image = new Image();
      image.src = imageSrc;
  
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const pixelCrop = {
          x: crop.x * scaleX,
          y: crop.y * scaleY,
          width: crop.width * scaleX,
          height: crop.height * scaleY,
        };
  
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
  
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
  
        // As Base64 string
        const base64Image = canvas.toDataURL('image/jpeg');
        callback(base64Image);
      };
    };
  
    return (
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
  
        <Modal
          isOpen={showCropModal}
          onRequestClose={() => setShowCropModal(false)}
          contentLabel="Crop Image"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            content: {
              position: 'static',
              width: '80%',
              maxWidth: '600px',
              maxHeight: '80%',
              margin: 'auto',
              overflow: 'visible',
              borderRadius: '8px',
            },
          }}
        >
          {selectedImage && (
            <>
              <ReactCrop
                src={selectedImage}
                crop={crop}
                onChange={handleCropChange}
              />
              <button onClick={handleImageCrop}>Crop Image</button>
            </>
          )}
        </Modal>
  
        {croppedImage && (
          <div>
            <h2>Cropped Image</h2>
            <img src={selectedImage} alt="" />
            <img src={croppedImage} alt="Cropped" />
          </div>
        )}
      </div>
    );
  };

















const Divider = styled.div`
    display: grid;
    grid-template-columns: 73% auto;
`


const FeedSection = styled.div`
border: 2px solid green;
padding: 0 70px;
`
const AlsoFollowBar = styled.div`
border: 2px solid red;
`
export default Feed