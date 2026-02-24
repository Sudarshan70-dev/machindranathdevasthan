import { Card, CardContent, Typography, Box } from "@mui/material";

export default function SimpleCard(props) {
  return (
    <Card
      className="festivalCard"
      sx={{
        backgroundColor: "#fbdaac",
        "& .MuiTypography-root": {
          fontFamily: '"Josefin Sans", sans-serif',
        },
      }}
    >
      <Box className="festivalCardHeader">
        <Typography variant="h6" className="festivalCardTitle">
          {props.title}
        </Typography>
      </Box>

      <CardContent className="festivalCardContent">
        <Typography variant="body1" className="festivalCardDescription">
          {props.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
