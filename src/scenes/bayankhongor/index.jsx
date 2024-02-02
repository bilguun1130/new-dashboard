import { Box } from "@mui/material";
import Header from "../../components/Header";
import HuisiinAngilal from "../../components/HuisiinAngilal";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import SanalDun from "../../components/SanalDun";
import Irts from "../../components/Irts";
import NasniiAngilal from "../../components/NasniiAngilal";
import { useLocation } from 'react-router-dom'

const Bayankhongor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentRoute = useLocation().pathname;
  let aimag;
  if (currentRoute === "/bayankhongor") {
    aimag = "Баянхонгор";
  }
  else if (currentRoute === "/arkhangai") {
    aimag = "Архангай";
  }
  else if (currentRoute === "/ovorkhangai") {
    aimag = "Өвөрхангай";
  }
  const title = aimag + " аймаг";
  const subtitle = "УИХ сонгуулийн дүн " + aimag + " аймаг";
  return (
    <Box 
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "100px"
      }}
    >
        <Header title= {title} subtitle= {subtitle} />
        <Box sx={{
          margin:'auto',
          width: '800px',
          minWidth: '300px',
          height: '400px',
        }}>
            <Irts />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            gap: "40px",
          }}   
        >
          <NasniiAngilal />
          <HuisiinAngilal />
        </Box>
        <Box sx={{
          margin:'auto',
          width: '1500px',
          minWidth: '300px',
          height: '2000px',
        }}>
            <SanalDun />
        </Box>

    </Box>
  )
}

export default Bayankhongor;