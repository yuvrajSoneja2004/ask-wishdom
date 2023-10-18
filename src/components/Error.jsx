import styled from "@emotion/styled";
import React from "react";
import ErrPic from "../assets/error.png";

function Error({ code }) {
  console.log(code, "the code");
  return (
    <Whole>
      <img src={ErrPic} alt="error-img" width={300} />
      <strong>Something Went Wrong</strong>
      <p> Please try again later. We apologize for the inconvenience.</p>
      <code>{typeof code == "string" ? code : "Finding Cause..."}</code>
    </Whole>
  );
}

const Whole = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  strong {
    font-size: 27px;
    margin-bottom: 10px;
  }

  code {
    margin-top: 10px;
  }
`;

export default Error;
