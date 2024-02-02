import React from 'react'
import { useLocation } from 'react-router-dom'
import { tokens } from "../theme";
import { Box, useTheme, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {election2020Attendance} from '../data/election2020attendance'
const NasniiAngilal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentRoute = useLocation().pathname;
  let data;
  if (currentRoute === '/bayankhongor') {
    data = election2020Attendance.filter((item) => item.id === 2)[0];
  } else if (currentRoute === '/arkhangai') {
    data = election2020Attendance.filter((item) => item.id === 1)[0];
  } else if (currentRoute === '/ovorkhangai') {
    data = election2020Attendance.filter((item) => item.id === 3)[0];
  }
  const age18To25 = data['18-25 нас']
  const age26To40 = data['26-40 нас']
  const age41To55 = data['41-55 нас']
  const age56Above = data['56 ба түүнээс дээш']
  data = {
    labels: ['18-25 нас', '26-40 нас', '41-55 нас', '56 ба түүнээс дээш'],
    datasets: [
      {
        data: [age18To25, age26To40, age41To55, age56Above],
        backgroundColor: ['#ADD8E6', 'pink ', '#90EE90', '	#FFFFED'],
      },
    ],
  };
  console.log(data, "nas");
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Сонгогчдын насны ангилал',
        color:"#FFFFFF",
        padding:{
          top: 0,
          bottom: 60,
        },
        font: {
          size: 30,
          weight: 'bold',
        },
      },
      legend: {
        display: false,
      },
      datalabels: {
        color: '#000',
        font: {
          size: 14,
          weight: 'bold',
        },
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    },
    }

  return (
    
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        maxWidth: '800px',
      }}
    >
      <Bar data={data} options={options}/>
    </Box>
    
  )
}

export default NasniiAngilal