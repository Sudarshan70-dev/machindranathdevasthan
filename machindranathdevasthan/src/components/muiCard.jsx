import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import MuiButton from './muiButton';

export default function MultiActionAreaCard(props) {
    const imgPath = props.img;
    const titleText = props.title;
    const descriptionText = props.description;
    const buttonName = props.buttonText;

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 360,
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fbdaac",
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 18px 40px rgba(127, 29, 29, 0.12)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "& .MuiTypography-root": {
          fontFamily: '"Josefin Sans", sans-serif',
        },
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 24px 44px rgba(127, 29, 29, 0.18)",
        },
      }}
    >
      <CardActionArea sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="160"
          image={imgPath}
          alt={titleText}
          className="cardImage"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography className="headerTextSize headerColor centerDiv" gutterBottom variant="h5" component="div">
            {titleText}
          </Typography>
          <Typography variant="body2" sx={{ color: "#7F1D1D" }}>
            {descriptionText}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: "center", pb: 2 }}>
       <MuiButton 
       onClick={props.onButtonClick}
      >{buttonName}</MuiButton>
      </CardActions>
    </Card>
  );
}

