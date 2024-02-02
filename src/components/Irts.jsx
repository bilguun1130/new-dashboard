import React from 'react'
import { tokens } from "../theme";
import { Box, useTheme, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom'
import {election2020Attendance} from '../data/election2020attendance'
import { Pie } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
const Irts = () => {
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
  const niitSongogch = data['Нийт сонгогчийн тоо'];
  const sanalUgsun = data['Санал өгсөн хүний тоо'];
  const sanalUguugui = niitSongogch - sanalUgsun;
  data = {
    labels: ['Санал хураалтанд оролцсон', 'Санал хураалтанд оролцоогүй'],
    datasets: [
      {
        data: [sanalUgsun, sanalUguugui],
        backgroundColor: ['#36A2EB', colors.grey[100]],
        cutout: '70%',
        circumference:180,
        rotation: 270
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      datalabels: {
        color: '#000',
        font: {
          size: 14,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${((tooltipItem.raw / niitSongogch)*100).toFixed(0)}%`
          }
        }
      }
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
      }}
    >
      <Typography
        sx={{
          variant: 'h1',
          textAlign: 'center',
          fontSize: '30px',
          fontWeight: 'bold',
          marginRight:'30%'
        }}
      >
        Ирцийн Мэдээ
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}      
      >
      <Pie data={data} options={options} plugins={[ChartDataLabels]}/>
      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '30px',
          fontWeight: 'bold',
          position: 'absolute',
          top: '55%',
          right: '54%',
        }}
      >
        Нийт: {niitSongogch}
      </Typography>
      </Box>
      
    </Box>
  )
  }
  
  

export default Irts