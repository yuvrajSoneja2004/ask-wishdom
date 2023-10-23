import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axiosInstance'
import { Link } from 'react-router-dom';

function AllProfiles() {

    const [first, setfirst] = useState([])

    const fetchAllUsers = async () => {
      try {
        let fetch = await axiosInstance.get("/getAllProfiles");
        let res = await fetch.data;
        setfirst(res);
      } catch (error) {
        console.log(error, "Error at the time of fetching allProfiles");
      }
    };

    useEffect(() => {
      fetchAllUsers();
    }, []);
  return (
   <>
   <div>
    {
        first.map((da , i) => {
            return <Link to={`/getProfile/${da?.userID}`}><img src={da?.userProfilePic} alt="" key={i} /></Link>
        })
    }
   </div>
   
   </>
  )
}

export default AllProfiles