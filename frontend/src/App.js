import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/emilys-candy/400.css'
import { useState } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { CustomStyles } from './AppMUI';
// Images
import NeonK from './Storage/Images/Homepage/Neon_K.png'
// Material Ui imports
import {    
  Avatar, Divider,
  IconButton, Tooltip, Typography, Menu,  
  MenuItem, SettingsOutlinedIcon,
} from './Storage/MuiExports';
// Component imports 
import { 
  Homepage
 } from './components/componentExports';

// Change website logo so I don't get sued down the road
// Add weather element in navBar to always tell the weather

function App(props) {
  // const navBarTabs = ['menuIcon', 'portfolio']
  // const mainTabs = ['Bible City','Live WebSites', 'Console Games', 'Games', 'Gaming Forum',
  // 'Shopping Tab', 'News Channel', 'Social Media Page', 'Math Solver', 'Closest Fast Food',
  // 'Optimum(Best of Anything)', 'Are We Friend/s', 'Text to Story', 'Story Designer', 'Website Review',
  // 'Creative Typing', 'Ew my Voice', 'Web Scraper']

  const [ menuAnchor, setMenuAnchor ] = useState(null)
  const open = Boolean(menuAnchor)

  function menuOpen(event) {
    setMenuAnchor(event.currentTarget)
  }

  function menuClose() {
    setMenuAnchor(null)
  }
   
  return (
    <main className='AppPage'>
      <nav className='AppNavBar'>

        {/* Profile Icon */}
        <Tooltip title='Profile' sx={CustomStyles.profileToolTip}>
          <IconButton
            onClick={menuOpen}
          >
            <Avatar sx={CustomStyles.profileTooltipAvatar}>
              <img src={NeonK} alt='Neon K'/>
            </Avatar>
          </IconButton>
        </Tooltip>

        {/* Menu for Profile Icon */}
        <Menu
          anchorEl={menuAnchor}
          id='profile-menu'
          open={open}
          onClose={menuClose}
          onClick={menuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom'}}
          PaperProps= {CustomStyles.profileMenuPaperProp}
          className='ProfileMenu'
        >
          {/* Profile Icon */}
          <MenuItem onClick={menuOpen} sx={CustomStyles.profileMenuItems.profile.container}>
            <Avatar sx={CustomStyles.profileMenuItems.profile.icon}>
              <img src={NeonK} alt='Neon K'/>
            </Avatar>
            <Typography sx={CustomStyles.profileMenuItems.profile.text} > Profile </Typography>
          </MenuItem>

          <Divider sx={CustomStyles.divider1.sx}/>
          
          {/* Settings Icon */}
          <MenuItem onClick={menuOpen} sx={CustomStyles.profileMenuItems.settings.container}>
            <SettingsOutlinedIcon sx={CustomStyles.profileMenuItems.settings.icon}/>
            <Typography sx={CustomStyles.profileMenuItems.settings.text} > Settings </Typography>
          </MenuItem>
        </Menu>
      </nav>

      <main className='Routes'>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
        </Routes>
      </main>
    </main>
  )
}

// Redux Storage Container
function GrabbingStorage(state) {
  return {
    tabStorage: state.tabStorage,
    accessToken: state.accessToken,
  }
}
export default connect(GrabbingStorage)(App);
 