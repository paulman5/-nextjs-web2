import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Upload } from 'antd';
import { Header } from 'antd/es/layout/layout';
import "../../styles/Draftpagestyling/Drafthome.css";

export default function Documentdrafthome() {
  const handleButtonClick = () => {
    fetch('https://localhost:7166/Getsample', {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          console.log('OK response received');
        } else {
          console.error('Error response received');
        }
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  };
    return(
<div>
<Header style={{width:"100vw", backgroundColor:"white"}}>
    <Button onClick={handleButtonClick} className='generatebutton' type="primary" style={{backgroundColor:"#1677ff!important"}}>Generate document</Button>
    </Header>
  </div>
    )
}