import React from 'react'
import { useLocation } from 'react-router-dom'
import { tokens } from "../theme";
import { Box, useTheme, Typography } from "@mui/material";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {election2020Attendance} from '../data/election2020attendance'
const HuisiinAngilal = () => {
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
  data = {
    labels: ['Эрэгтэй', 'Эмэгтэй'],
    datasets: [
      {
        data: [data['Эрэгтэй'], data['Эмэгтэй']],
        backgroundColor: ['#ADD8E6', 'pink'],
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        color: '#000',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
      title: {
        display: true,
        text: 'Сонгогчдын хүйсний ангилал',
        color:"#FFFFFF",
        padding:{
          top: 0,
          bottom: 30,
        },
        font: {
          size: 30,
          weight: 'bold',
        },
      },
    },
    }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '40%',
        maxWidth: '400px',
      }}
    >

      <Pie data={data} options={options} plugins={[ChartDataLabels]} />
      
    </Box>
  )
}

export default HuisiinAngilal