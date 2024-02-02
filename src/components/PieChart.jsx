import { tokens } from "../theme";
import { Box, useTheme, Typography } from "@mui/material";
import { election2020CandidatesBayankhongor as pieData } from "../data/election2020candidatesBayankhongor";
import {Chart as ChartJS} from "chart.js/auto"
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels"
function randomColorGenerator () {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

const PieChart = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const total = pieData.filter((item) => item.id ==="total")[0];
    const keys = Object.keys(total).filter((item) => item !== "id");
    const data = {
        labels: keys,
        datasets: [
            {
                label: "Total",
                // label: keys.map((item) => item),
                data: keys.map((key) => total[key]),
                backgroundColor: keys.map(() => randomColorGenerator()),
            },
        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    font: {
                        size: 14,
                    },
                    color: colors.grey[100]
                }
                
            },
            display: true,
            overlap: false,
            
        },
    };

    return (
        <Box>
            <Pie data={data} options={options}/>
            <Typography
                sx={{
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "bold",
                }}
            >
            dsadsa

            </Typography>
        </Box>
        
    );
};

export default PieChart;