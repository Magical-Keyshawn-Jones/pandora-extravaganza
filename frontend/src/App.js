import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/emilys-candy/400.css'
import { useState } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
// Material Ui imports
import {  
  AccountCircleRoundedIcon, Avatar, Box,  Drawer, Divider,
  IconButton, List, ListItemButton, 
  ListItemText, ListItemIcon, Logout, Tabs, Tab, Tooltip, Typography, Menu,  
  MenuRoundedIcon, MenuItem,
} from './Storage/MuiExports';
// Component imports 
import { 
  HomePage,
  PageNotFound,
  Portfolio, 
  TestingRenders,
  WebsiteLogin,
 } from './components/componentExports';

/* Notes
  @Tabs value might pose a problem if the page refreshes. If thats the case have the value = page url
  #On open mount have the navbar transition in from the top
*/

function App(props) {
  const navFont = createTheme({
    typography: {
      fontFamily: ['emilys-candy'].join(',')
    }
  })
  const navigate = useNavigate()
  // Sidebar main tabs
  const bestTabs = ['Portfolio', 'HomePage', 'Bible City', 'Shopaganza', 'Pandorian'] 
  const mainTabs = ['Bible City','Live WebSites', 'Console Games', 'Games', 'Gaming Forum',
  'Shopping Tab', 'News Channel', 'Social Media Page', 'Math Solver', 'Closest Fast Food',
  'Optimum(Best of Anything)', 'Are We Friend/s', 'Text to Story', 'Story Designer', 'Website Review',
  'Creative Typing', 'Ew my Voice', 'Web Scraper']
  const [currentTab, setCurrentTab] = useState(tabTracker())
  const [loggedIn, setLoggedIn] = useState(false)
  // Profile anchor
  const [profileAnchor, setProfileAnchor] = useState(null)
  const open = Boolean(profileAnchor)
  // State of Anchor
  const [profileOpen, setProfileOpen] = useState(false)
  //Hooking profile handler
  function hookProfileAnchor(event){
    setProfileAnchor(event.currentTarget)
    setProfileOpen(!profileOpen)
  }

  // Using this to lift up state
  function loginStatus() {
    setLoggedIn(!loggedIn)
  }

  // Custom Themes
  const theme = createTheme({
    palette: {
      primary: {
        main: '#f8bbd0',
      }
    }
  })

  const sideBarFont = createTheme({
    typography: {
      fontFamily: ['emilys-candy'].join(',')
    }
  })
  // Keeps track of current tab
  function tabTracker(){
    const url = window.location.href;
    if (url.includes('home')) {
      return 'Pandora extravaganza'
    } else if (url.includes('portfolio')) {
      return 'Portfolio'
    } else if (url.includes('accountMenu')) {
      return 'AccountMenu'
    } else {
      return 'Login'
    }
  }
  // SideBar
  const [sideBar, setSideBar] = useState(false)
  
    // SideBar Logic
    function toggleDrawer () {
        setSideBar(!sideBar)
    }

    function listMainTabs(tab) {
        return (
            <Box key={tab} sx={{color: 'white', borderBottom: 'black solid 1px', width: 250, ":hover": {background: 'linear-gradient(to right, #000000, #434343)', color: '#69EEFF'}}} onClick={()=>{toggleDrawer()}} >
              <List disablePadding >
                    <ListItemButton>
                        <ListItemText primary={tab}/>
                    </ListItemButton>
                </List>
            </Box>
        )
    }
  
  // Current Tab Helper
  // Tabs value might pose a problem if the page refreshes. If thats the case have the value = page url
  function selectedTab(tab, capTab, event, menu) {
    if (menu) {toggleDrawer()} 
    else if (tab === 'login') {
      setCurrentTab(capTab)
      navigate('/')
      event.preventDefault()
    } else if (tab === 'pandora extravaganza') {
      setCurrentTab(capTab)
      navigate('/home')
    } else if (capTab && event) {
      setCurrentTab(capTab)
      navigate(`/${tab}`)
      event.preventDefault()
    }
  }
  
  // Tab factory
  // variable to keep track of login
  const tabList = ['menuIcon', 'login', 'portfolio', 'pandora extravaganza']
  function tabFactory(name) {
    // Capitalize the first letter of a string
    const capName = name.charAt(0).toUpperCase() + name.slice(1)
    switch(name){
      case 'login':
        if (loggedIn === true) {return} else {
          return (
            <Tab key={capName + '.'} value={capName} label={capName} sx={{color: 'white'}} onClick={(event)=>{selectedTab(name, capName, event)}}/>
          )
        }
      case 'menuIcon':
        return (
          <Tooltip key={capName} title='Menu'>
            <Tab key={capName} value={capName} sx={{color: 'white'}} icon={<MenuRoundedIcon/>} onClick={(event)=>{selectedTab(name, capName, event, true)}}/>
          </Tooltip>
        )
      case 'pandora extravaganza':
        return (
          <Tab key={capName} value={capName} label={capName} sx={{color: 'white'}} onClick={(event)=>{selectedTab(name, capName, event)}}/>
        )
      default:
        return (
          <Tab key={capName} value={capName} label={capName} sx={{color: 'white'}} onClick={(event)=>{selectedTab(name, capName, event)}}/>
        )
    }
  }
  // linear-gradient(to right, #ef32d9, #89fffd)
  return (
    <main id ='Website' component="main">
      <ThemeProvider theme={theme}>
        {/* Box-Shadow: H-offset, V-offset, blurRadius, SpreadRadius(optional), Color */}
      <Box sx={{boxShadow: '0 0 .5rem 4px black'}} className='NavBar'>

        <Drawer open={sideBar} PaperProps={{sx: {background: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)'}}} onClose={()=>{toggleDrawer()}}>
          <ThemeProvider theme={sideBarFont}><Typography sx={{ background: 'linear-gradient(to right, #ef32d9, #89fffd)', textAlign: 'center', height: '3rem', fontSize: '2rem'}}>
            Wassup, Kiwi!  
          </Typography></ThemeProvider>
          {mainTabs.map((item, index)=>{return listMainTabs(item)})}
        </Drawer>

        <Tabs key='navBar' value={currentTab} >
          {tabList.map(item=>{return tabFactory(item)})}
        </Tabs>

        {loggedIn === false ? <ThemeProvider theme={navFont}><Typography sx={{ color: 'white', fontSize: '1.5rem'}}>Sign or Register to enjoy your stay</Typography></ThemeProvider> : null}

        <Tooltip title='Account settings'>
          <IconButton onClick={(event)=>{hookProfileAnchor(event)}} >
            <AccountCircleRoundedIcon sx={{width: '3rem', height: '3rem', color: 'white',}}/>
          </IconButton>
        </Tooltip>

      </Box>
      </ThemeProvider>

      <Menu 
      anchorEl={profileAnchor}  
      id='account-menu' 
      open={open}
      onClose={()=>{setProfileAnchor(null)}}
      onClick={()=>{setProfileAnchor(null)}}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      className='Account'
      PaperProps={{
        sx: {
          '& .MuiAvatar-root': {
            marginRight: '1rem'
          }
        }
      }}
      >
        <MenuItem>
          <Avatar /> My Profile
        </MenuItem>
        <Divider/>
        <MenuItem>
          <ListItemIcon>
            {/* Size of the Icon */}
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Routes>
        <Route path='/' element={<WebsiteLogin loginStatus={loginStatus} />}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/testingRenders' element={<TestingRenders/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </main>
  )
}

// Redux Storage Container
function GrabbingStorage(state) {
  return {
    tabStorage: state.tabStorage,
  }
}
export default connect(GrabbingStorage)(App);
 