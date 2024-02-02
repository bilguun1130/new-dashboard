import React from 'react'
import { tokens } from '../../theme';
import { Box, useTheme, MenuItem, FormControl, InputLabel, Select} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js';
import { election2020CandidatesArkhangai } from '../../data/election2020candidateArkhangai';
import { election2020CandidatesUvurkhangai } from '../../data/election2020candidatesUvurkhangai';
import { election2020CandidatesBayankhongor } from '../../data/election2020candidatesBayankhongor';
import { election2020Attendance } from '../../data/election2020attendance';
import { useState } from 'react';
import annotationPlugin from 'chartjs-plugin-annotation';



ChartJS.register(annotationPlugin);
function valueExtract(dataArr) {
    return dataArr.map((item) => item[1]);
}
function keyExtract(dataArr) {
    return dataArr.map((item) => item[0]);
}
const colorPalette = ['#FFA686', '#7DCD85', '#BAC7BE'];
const colorPaletteParty = ['#D22B2B', '#0096FF',  '#BAC7BE']


function backgroundColorForAimag() {
    let backgroundColor =[]
    for (let i = 0; i < colorPalette.length; i++) {
        for (let j = 0; j < 6; j++){
            backgroundColor.push(colorPalette[i]);
        }
    }
    return backgroundColor;
}

function backgroundColorForParty(dataArr) {
    let backgroundColor = [];

    for (let i = 0; i < dataArr.length; i++) {
        if (ardiinNam.includes(dataArr[i][0])) {
            backgroundColor.push(colorPaletteParty[0]);
        }
        else if (ardchilsanNam.includes(dataArr[i][0])) {
            backgroundColor.push(colorPaletteParty[1]);
        }
        else {
            backgroundColor.push(colorPaletteParty[2]);
        }
    }

    return backgroundColor;
    
}

function findTop6(dataArr) {
    const data = dataArr.filter((item) => item.id === 'total')[0]
    return Object.entries(data).sort((item1, item2) => item2[1] - item1[1]).slice(1, 7);
}
let bottomData ='';
let bottomID = ''


const top6Arkhangai2020 = findTop6(election2020CandidatesArkhangai);
const top6Uvurkhangai2020 = findTop6(election2020CandidatesUvurkhangai);
const top6Bayankhongor2020 = findTop6(election2020CandidatesBayankhongor);

const top6All = [...top6Arkhangai2020, ...top6Bayankhongor2020, ...top6Uvurkhangai2020];
let labels = keyExtract(top6All);;
let values =valueExtract(top6All);
const totalVoters = election2020Attendance.map((item) => item["Санал өгсөн хүний тоо"]);
const ardchilsanNam = labels.filter((item) => {
    if (item.includes('- АН')) return item;
})
const ardiinNam = labels.filter((item) => {
    if (item.includes('- МАН')) return item;
});
const busadNam = labels.filter((item) => {
    if (!item.includes('- МАН') && !item.includes('- АН')) return item;
});
const byVoteNumberData = [...top6Arkhangai2020, ...top6Bayankhongor2020, ...top6Uvurkhangai2020].sort((item1, item2) => item2[1] - item1[1]);
const Dashboard = () => {
    const [newBottomData, setNewBottomData] = useState(bottomData);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let data = {};
    let options = {};
    let bottomLabels = [];
    let bottomValues = [];
    const [selection, setSelection] = React.useState('');
    const totalVotersSum = totalVoters.reduce((acc, curr) => acc + curr, 0);
    function getElemByID(id) {
        let data;
        if(Object.keys(election2020CandidatesArkhangai[0]).includes(id)) {
            data = election2020CandidatesArkhangai;
            
        }
        else if (Object.keys(election2020CandidatesBayankhongor[0]).includes(id)) {
            data = election2020CandidatesBayankhongor;
            
        }
        else if (Object.keys(election2020CandidatesUvurkhangai[0]).includes(id)) {
            data = election2020CandidatesUvurkhangai;
        }
        bottomID = id;
        bottomData = data.filter((item) => item.id !== 'total');
        setNewBottomData(bottomData);
        return;
    }
    
    if(selection === '' || selection === 'aimag') {
        const backgroundColor = backgroundColorForAimag();
        labels = keyExtract(top6All);
        values = valueExtract(top6All);
        data = {
            labels: labels,
            datasets: [
                {
                    label: 'Нийт',
                    data: values,
                    backgroundColor: backgroundColor,
                },
            ],
        };
        options = {
            scales: {
                x: 
                    {
                            
                        type: 'category',
                        ticks: {
                            callback:function(label) {
                                let realLabel = this.getLabelForValue(label);
                                return realLabel;
                            },
                            maxRotation: 90,
                        },
                    },
                x3: {
                    type: 'category',
                    grid: {
                        drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                    ticks: {
                        callback:function(label) {
                            let realLabel = this.getLabelForValue(label);
                    
                            if (realLabel === 'Батмөнхийн БАТЦЭЦЭГ - МАН ') return 'Баянхонгор аймаг';
                            if(realLabel === 'Ганзоригийн ТЭМҮҮЛЭН - МАН ') return 'Архангай аймаг';
                            if (realLabel === 'Оюунсайханы АЛТАНГЭРЭЛ - АН ') return 'Өвөрхангай аймаг';
    
                        }
                    }
        
                },
            },
            onClick: function(evt, element) {
                const {dataIndex, raw} = element[0].element.$context;
                getElemByID(labels[dataIndex]);
                console.log(this.update());          },
            elements: {
                bar: {
                    borderWidth: 2,
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    position: 'right',
                },
                title: {
                    display: true,
                    text: `2020 оны Сонгуулийн Архангай, Баянхонгор, Өвөрхангай аймгийн нийт санал өгсөн хүний тоо:  ${totalVotersSum.toLocaleString()}`,
                    font: {
                        size: 20,
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            if (tooltipItem.dataIndex < 6){
                                return (`${tooltipItem.label}: ${tooltipItem.formattedValue} / ${totalVoters[0].toLocaleString()}, ${((tooltipItem.raw / totalVoters[0]) * 100).toFixed(1)}%`);
                            }
                            if (tooltipItem.dataIndex > 5 && tooltipItem.dataIndex < 12){
                                return (`${tooltipItem.label}: ${tooltipItem.formattedValue} / ${totalVoters[1].toLocaleString()}, ${((tooltipItem.raw / totalVoters[1]) * 100).toFixed(1)}%`);
                            }
                            if (tooltipItem.dataIndex > 11 && tooltipItem.dataIndex < 18){
                                return (`${tooltipItem.label}: ${tooltipItem.formattedValue} / ${totalVoters[2].toLocaleString()}, ${((tooltipItem.raw / totalVoters[2]) * 100).toFixed(1)}%`);
                            }
                        },
                    },
                }
            },
        };
    }
    
    else if (selection === 'niitSanal') {
        const backgroundColor = backgroundColorForParty(byVoteNumberData);
        labels = keyExtract(byVoteNumberData);
        values = valueExtract(byVoteNumberData);
        data = {
            labels: labels,
            datasets: [
                {
                    label: 'Нийт',
                    data: values,
                    backgroundColor: backgroundColor,
                },
            ],
        };
        options = {
            scales: {
                x: 
                    {
                            
                        type: 'category',
                        ticks: {
                            callback:function(label) {
                                let realLabel = this.getLabelForValue(label);
                                return realLabel;
                            },
                            maxRotation: 90,
                        },
                    },
            },
            elements: {
                bar: {
                    borderWidth: 2,
                },
            },
            responsive: true,
            plugins: {
                annotation: {
                    annotations: {
                        // line1: {
                        //     display: true,
                        //     type: 'line',
                        //     mode: 'horizontal',
                        //     yMin:192314,
                        //     yMax:192314,
                        //     borderColor: 'red',
                        //     borderWidth: 5,
                        //     label: {
                        //         display: true,
                        //         enabled: true,
                        //         content: ['3н аймгийн нийт сонгогчийн тоо 2023 оны 11 сарын 30ны байдлаар 192,314'],
                        //         backgroundColor: 'white',
                        //         drawTime: 'afterDatasetsDraw',
                        //         color: 'black',
                        //     },
                        // },
                        line2: {
                            type: 'line',
                            mode: 'horizontal',
                            yMin:134620,
                            yMax:134620,
                            borderColor: 'red',
                            borderWidth: 5,
                            label: {
                                display: true,
                                enabled: true,
                                content: ['134,620 хүн нь нийт сонгогчдын 70% (192,314)'],
                                backgroundColor: 'white',
                                drawTime: 'afterDatasetsDraw',
                                color: 'black',
                            },
                        },
                        line3: {
                            type: 'line',
                            mode: 'horizontal',
                            yMin:38000,
                            yMax:38000,
                            borderColor: '#FFA686',
                            borderWidth: 5,
                            label: {
                                display: true,
                                enabled: true,
                                content: ['Баянхонгор аймгийн 2020 оны сонгуульд нийт санал өгсөн сонгогчийн тоо 45,318, ирц 80% '],
                                backgroundColor: 'white',
                                drawTime: 'afterDatasetsDraw',
                                color: 'black',
                            },
                        },
                        line4: {
                            type: 'line',
                            mode: 'horizontal',
                            yMin: 45469,
                            yMax: 45469,
                            borderColor: 'blue',
                            borderWidth: 5,
                            label: {
                                display: true,
                                enabled: true,
                                content: ['Архангай аймгийн 2020 оны сонгуульд нийт санал өгсөн сонгогчийн тоо 45,469, ирц 74% '],
                                backgroundColor: 'white',
                                drawTime: 'afterDatasetsDraw',
                                color: 'black',
                            },
                        },
                        line5: {
                            type: 'line',
                            mode: 'horizontal',
                            yMin: 53286,
                            yMax: 53286,
                            borderColor: 'green',
                            borderWidth: 5,
                            label: {
                                display: true,
                                enabled: true,
                                content: ['Өвөрхангай аймгийн 2020 оны сонгуульд нийт санал өгсөн сонгогчийн тоо 53,826, ирц 72% '],
                                backgroundColor: 'white',
                                drawTime: 'afterDatasetsDraw',
                                color: 'black',
                            },
                        },
                    },

                },
                legend: {
                    display: false,
                    position: 'right',
                },
                title: {
                    display: true,
                    text: `2020 оны Сонгуулийн Архангай, Баянхонгор, Өвөрхангай аймгийн нийт санал өгсөн хүний тоо:  ${totalVotersSum.toLocaleString()}`,
                    font: {
                        size: 20,
                    }
                },
                tooltip: {
                    title: 'dsadsa',
                    callbacks: {
                        label: function(tooltipItem) {
                            if (tooltipItem.dataIndex < 6){
                                return (`${tooltipItem.label}: ${tooltipItem.formattedValue} / ${totalVoters[0].toLocaleString()}, ${((tooltipItem.raw / totalVoters[0]) * 100).toFixed(1)}%`);
                            }
                            if (tooltipItem.dataIndex > 5 && tooltipItem.dataIndex < 12){
                                return (`${tooltipItem.label}: ${tooltipItem.formattedValue} / ${totalVoters[1].toLocaleString()}, ${((tooltipItem.raw / totalVoters[1]) * 100).toFixed(1)}%`);
                            }
                            if (tooltipItem.dataIndex > 11 && tooltipItem.dataIndex < 18){
                                return (`${tooltipItem.label}: ${tooltipItem.formattedValue} / ${totalVoters[2].toLocaleString()}, ${((tooltipItem.raw / totalVoters[2]) * 100).toFixed(1)}%`);
                            }
                        },
                    },
                }
            },
        };
    }
    if (bottomData.length === 0) {
        const newData = election2020CandidatesBayankhongor.filter((item) => item.id !== 'total');
        bottomLabels = newData.map((item) => item.id);
        bottomValues = Object.values(newData).map(array => array['Гомбожавын ЗАНДАНШАТАР - МАН ']);
    }
    else if (bottomData.length > 0) {
        bottomLabels = bottomData.map((item) => item.id);
        bottomValues = Object.values(bottomData).map(array => array[bottomID]);
        
    }
    const secondChartData = {
        labels: bottomLabels,
        datasets: [
            {
                label: "Нийт",
                data: bottomValues,
                backgroundColor: '#FFA686',
            },
        ],
    };
    const secondChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            }
        },
        plugins: {
            title: {
                display: true,
                text: `2020 оны Сонгуульд ${bottomID.length === 0 ? 'Гомбожавын ЗАНДАНШАТАР - МАН ': bottomID} авсан санал  ${bottomValues.reduce((acc, val) => acc + val, 0).toLocaleString()}`,
                font: {
                    size: 20,
                }
            },
        }
        }
    
    const myChart = <Bar data={data} options={options} plugins={[annotationPlugin]} />;
    const bottomChart = <Bar data={secondChartData} options={secondChartOptions} />;
    const handleChange = (event) => {
        setSelection(event.target.value);
    };
    return (
        <Box sx={{ width: '100%', maxWidth: '1480px' , backgroundColor:colors.background, marginLeft: '5%', display: 'flex', flexDirection:'column', gap: '30px', height: '100vh' }}>
            <Box sx={{ minWidth: 120, maxWidth: 250 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selection}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={'niitSanal'}>Авсан саналын тоогоор</MenuItem>
          <MenuItem value={'aimag'}>Аймгаар</MenuItem>
        </Select>
      </FormControl>
    </Box>

            {myChart}
            {bottomChart}
            <Box>
            <iframe width="100%" maxHeight="1400px" height="1000px" src="https://lookerstudio.google.com/embed/reporting/954005ad-1d70-4028-ae81-f05cf00cb605/page/psEpD" frameBorder="0" allowFullScreen sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
            </Box>
            
            
            
        </Box>
    )
}

export default Dashboard;