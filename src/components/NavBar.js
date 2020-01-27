import React, { Component,useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CustomMenu from './Menu';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar() {
  const classes = useStyles();
  const [title, setTitle] = useState('Home');
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <CustomMenu changeTitle={(newtitle)=>setTitle(newtitle)}/>
          </IconButton> 
		  <Typography variant="h6" className={classes.title}>
			{title}
		  </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
class NavBar extends Component {
  render() {
    return(
		<ButtonAppBar/>
	);
  }
}
export default NavBar;