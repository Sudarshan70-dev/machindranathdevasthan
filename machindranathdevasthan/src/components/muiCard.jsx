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
        maxWidth: 345,
        minHeight: 420,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fbdaac",
        "& .MuiTypography-root": {
          fontFamily: '"Josefin Sans", sans-serif',
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

