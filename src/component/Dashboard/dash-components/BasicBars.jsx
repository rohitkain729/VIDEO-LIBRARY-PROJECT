import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import React from 'react';

export default function BasicBars() {

     const[vData,setVData]=React.useState([{
        CategoryId:0,
        CategoryName:"",
        VideoCount:0
      }]);
      
    
      React.useEffect(()=>{
        axios.get("http://localhost:4000/videocategorycount").then((res)=>{setVData(res.data)});
      });

  return (
    <BarChart  sx={{width: '100%',backgroundColor:'white',padding:'20px',borderRadius:'20px' }}
      xAxis={[{
        data:vData.map((item)=>item.CategoryName),
       }]}

      series={[{ 
        data:vData.map((item)=>item.VideoCount),
        label:'Videos Counts'
       }]}
      height={340}
    />
  );
}
