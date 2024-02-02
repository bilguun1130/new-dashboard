import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";


const Pie = () => {
    return (
      <Box m="20px">
        <Header title="Баянхонгор аймаг" subtitle="УИХ сонгуулийн дүн Баянхонгор аймаг" />
        <Box height="35vh" width={800} position={"absolute"} top={30}>
          <PieChart />
        </Box>
      </Box>
    );
  };
  
  export default Pie;