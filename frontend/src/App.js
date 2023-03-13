import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/emilys-candy/400.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { CustomStyles } from './AppMUI';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Images
import { images } from './Storage/images';
// Material Ui imports
import {    
  Avatar, Divider,
  IconButton, Tooltip, Typography, Menu,  
  MenuItem, SettingsOutlinedIcon, Tabs, Tab,
} from './Storage/MuiExports';
// Component imports 
import { 
  Homepage, Portfolio
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
  const [ currentTab, setCurrentTab ] = useState('Home')
  const navigate = useNavigate()
  const url = window.location.href
  // HomePage animation Status
  const [ animationStatus, setAnimationStatus ] = useState(true)

  
  
  // Handles CurrentTab Changes
  function currentTabChange(tab) {
    // Current window url
    const capitalized = tab.charAt(0).toUpperCase() + tab.slice(1)
    
    setCurrentTab(capitalized)
    setAnimationStatus(false)

    // If tab !== url then navigate to url
    // Example: Current tab is Home. This function will not navigate to home if the input was home
    switch(tab) {
      case 'home':
        if (url !== 'http://localhost:3000' || url !== 'https://pandora-extravaganza.vercel.app') { navigate('/') } return
      case tab:
        if (url.includes(`http://localhost:3000/${tab}`) || url.includes(`https://pandora-extravaganza.vercel.app/${tab}`)) { return } navigate(`/${tab}`)
        break;
      default:
        return
    }
  }

  // Corrects the Tab when the page refreshes
  useEffect(()=>{
    if (url === 'http://localhost:3000' || url === 'https://pandora-extravaganza.vercel.app') { setCurrentTab('Home') } else if 
    (url.includes('portfolio') || url.includes('portfolio')) { setCurrentTab('Portfolio') }
  },[])

  const tabTheme = createTheme({
    palette: {
      primary: {
        main: 'rgba(6, 240, 255, 1)'
      },
      text: {
        secondary: 'rgba(255, 255, 255, 1)',
      }
    },
    typography: {
      fontFamily: ['Shantell Sans',].join(','),
    },
  })

  function menuOpen(event) {
    setMenuAnchor(event.currentTarget)
    setAnimationStatus(false)
  }

  function menuClose() {
    setMenuAnchor(null)
  }

  axios.get('http://127.0.0.1:8000/users')
  .then(res => console.log(res))
  .catch(err => console.log(err, 'Big Bad!'))
   
  return (
    <main className='AppPage'>
      <nav className='AppNavBar'>

        {/* Tabs */}
        <ThemeProvider theme={tabTheme}>
          <Tabs value={currentTab} textColor='primary'>
            <Tab label='Home' value='Home' onClick={()=>{currentTabChange('home')}} sx={{top: '.5rem'}}/>
            <Tab label='Portfolio' value='Portfolio' onClick={()=>{currentTabChange('portfolio')}}  sx={{top: '.5rem'}}/>
          </Tabs>
        </ThemeProvider>

        {/* Profile Icon */}
        <Tooltip title='Profile' sx={CustomStyles.profileToolTip}>
          <IconButton
            onClick={menuOpen}
          >
            <Avatar sx={CustomStyles.profileTooltipAvatar}>
              <img src={images.homepage.Neon_K} alt='Neon K'/>
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
          transformOrigin={{ horizontal: 'left', vertical: 'top'}}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom'}}
          PaperProps= {CustomStyles.profileMenuPaperProp}
          className='ProfileMenu'
        >
          {/* Profile Icon */}
          <MenuItem onClick={menuOpen} sx={CustomStyles.profileMenuItems.profile.container}>
            <Avatar sx={CustomStyles.profileMenuItems.profile.icon}>
              <img src={images.homepage.Neon_K} alt='Neon K'/>
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
          <Route path='/' element={<Homepage animationStatus={animationStatus}/>}/>
          <Route path='/portfolio' element={<Portfolio/>}/>
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
 