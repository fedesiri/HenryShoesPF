
import React from 'react'
import ReactWhatsapp from 'react-whatsapp';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter'
import { Box, Grid,  Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  mainFooter: {
    backgroundColor: "black",
    color: "white",
    padding: '1rem',
    marginTop: 'calc(5% + 0px)',
    flexGrow: 1,
    bottom: 0,
    
  },
  wsp: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    border: 'none',
    fontSize: "30px"
  },
  wsp2: {
    color: "white",
    fontSize: "35px"
  },
  icons: {
    color: "white",
    fontSize: '35px',
  },
  text: {
    color: 'white',
    textDecoration: 'none',

  },
  divider: {
    marginBottom: "20px"
  },
  click: {
    color: "white",
    textDecoration: "none"
  },
  list: {
    paddingInlineStart: "0px",
    color: "white",
    textDecoration: "none"
  }
}));

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="initial" align="center">
      {"Copyright © "}
      <Link color="secondary" to={"/"} className={classes.click}>
        Henry Shoes
      </Link>{" "}
      | All rights reserved | Politics of Privacy{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  const classes = useStyles();

  return (
    <Box color="secondary" className={classes.mainFooter}>
      <Divider className={classes.divider}></Divider>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-end"
      >
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
        //   alignItems="flex-start"
        >
          {/* column */}
          <Grid item>
            <Typography variant="h6">HenryShoes</Typography>
            <ul className={classes.list}>
              <Typography>
                <button onClick={openChatBot} style={{backgroundColor:"black", color:"white"}}>
                HenryShoes assistant
              </button > 
              
                HenryShoes Assistance
              </Typography>
              <Typography>Payment terms</Typography>
              <Typography
                className={classes.text}
                component={Link}
                to={`/catalogpage`}
              >
                Shop
              </Typography>
              </ul>
          </Grid>
          {/* column */}
          <Grid item>
            <Typography variant="h6"></Typography>
            <ul className={classes.list} >
              <Typography></Typography>
              <Typography>Contact Us</Typography>
              <Typography>Find Us</Typography>
              </ul>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item><ReactWhatsapp
            className={classes.wsp}
            number="1-212-736-5000"
            message="Start chat"
            fontSize="large" 
          >
            <WhatsAppIcon color="secondary" className={classes.wsp2} />
          </ReactWhatsapp>
          </Grid>
          <Grid item>
          <a
            href="https://www.facebook.com/Henry-Shoes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon className={classes.icons} color="secondary" />
          </a>
          </Grid>

          <Grid item>      
          <a
            href="https://twitter.com/Henry-Shoes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon className={classes.icons} color="secondary" />
          </a>
          </Grid>
          <Grid item>
          <a
            href="https://www.instagram.com/Henry-Shoes"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon className={classes.icons} color="secondary" />
          </a>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" marginTop={2}>
          <Copyright />
        </Box>
      </Grid>
    </Box>
  );
};

export default Footer