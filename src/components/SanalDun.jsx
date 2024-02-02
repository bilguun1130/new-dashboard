import React from 'react'
import { useLocation } from 'react-router-dom'
import { tokens } from "../theme";
import { Box, useTheme} from "@mui/material";
import { Chart } from "react-chartjs-2";
import {election2020CandidatesArkhangai} from '../data/election2020candidateArkhangai'
import {election2020CandidatesUvurkhangai} from '../data/election2020candidatesUvurkhangai'
import {election2020CandidatesBayankhongor} from '../data/election2020candidatesBayankhongor'

const SanalDun = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentRoute = useLocation().pathname;
  const colorPallete = ['#BAC7BE', '#C2E1C2', '#7DCD85', '#80AB82', '#778472', '#FEC196','#FFA686','#D6A184', '#AA767C', '#63474D']
  let data;
  if (currentRoute === '/bayankhongor') {
    data = election2020CandidatesBayankhongor;
  } else if (currentRoute === '/arkhangai') {
    data = election2020CandidatesArkhangai;
  } else if (currentRoute === '/ovorkhangai') {
    data = election2020CandidatesUvurkhangai;
  }
  const total = data.filter((item) => item.id === 'total')[0];
  data = data.filter((item) => item.id !== "total");
  const myLabels = Object.keys(data[0]).filter((key) => key !== "id");
  let datasets =[];
  let backgroundColor = [];
  let j = 0;
  for (let i = 0; i < data.length; i++) {
    if (j < colorPallete.length) {
      backgroundColor.push(colorPallete[j]);
      j += 1;
    }
    else {
      j = 0
      backgroundColor.push(colorPallete[j]);
    }
  }
  for (let i = 0; i < data.length; i++) {
    const dataset = {
      type:'bar',
      label: data[i].id,
      data: Object.values(data[i]).filter((item, index) => index !== 0),
      backgroundColor: backgroundColor[i],
    }
    datasets.push(dataset);
  }
  const totalDataSet = {
    type: 'scatter',
    label: "Нийт",
    data: Object.values(total).filter((item, index) => index !== 0),
    pointBackgroundColor: 'red',
    radius: 5,
    hoverRadius: 10,
  }
  datasets.push(totalDataSet);

  // for (let i = 0; i < data.length; i++) {

  // }
  data = {
    labels: myLabels,
    datasets: datasets,
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        
      },
      colors: {
        enabled: false,
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
        text: 'Санал хураалт',
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
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '1000px',
        width: '1000px',
      }}
    >

      <Chart data={data} options={options} />
      
    </Box>
  )
}

export default SanalDun