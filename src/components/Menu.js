import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { Route, Switch, NavLink,BrowserRouter } from "react-router-dom";
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus({changeTitle}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Link
      </Button>
		  <StyledMenu
			id="customized-menu"
			anchorEl={anchorEl}
			keepMounted
			open={Boolean(anchorEl)}
			onClose={handleClose}
		  >
			<StyledMenuItem>
			  <ListItemIcon>
				<SendIcon fontSize="small" />
			  </ListItemIcon>
			  	<NavLink exact activeClassName='Navbar-active' to='/'onClick={()=>{changeTitle("Home")}}>
				  Home
				</NavLink>
			</StyledMenuItem>
			
			<StyledMenuItem>
			  <ListItemIcon>
				<InboxIcon fontSize="small" />
			  </ListItemIcon>
			  	<NavLink exact activeClassName='Navbar-active' to='/demo1' onClick={()=>{changeTitle("Demo1")}}>
				  Demo1
				</NavLink>
			</StyledMenuItem>
			
			<StyledMenuItem>
			  <ListItemIcon>
				<InboxIcon fontSize="small" />
			  </ListItemIcon>
				<NavLink exact activeClassName='Navbar-active' to='/demo2' onClick={()=>{changeTitle("Demo2")}}>
				  Demo2
				</NavLink>
			</StyledMenuItem>
			
			<StyledMenuItem>
			  <ListItemIcon>
				<InboxIcon fontSize="small" />
			  </ListItemIcon>
				<NavLink exact activeClassName='Navbar-active' to='/demo3' onClick={()=>{changeTitle("Demo3")}}>
				  Demo3
				</NavLink>
			</StyledMenuItem>

			<StyledMenuItem>
			  <ListItemIcon>
				<InboxIcon fontSize="small" />
			  </ListItemIcon>
				<NavLink exact activeClassName='Navbar-active' to='/demo4' onClick={()=>{changeTitle("Demo4")}}>
				  Demo4
				</NavLink>
			</StyledMenuItem>

		  </StyledMenu>
    </div>
  );
}