import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/emilys-candy/400.css'
import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { selectTab } from './Storage/Redux';
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

function App(props) {
  const { tabStorage } = props
  const navFont = createTheme({
    typography: {
      fontFamily: ['emilys-candy'].join(',')
    }
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Sidebar main tabs
  const navBarTabs = ['menuIcon', 'login', 'portfolio', 'pandora extravaganza']
  const mainTabs = ['Bible City','Live WebSites', 'Console Games', 'Games', 'Gaming Forum',
  'Shopping Tab', 'News Channel', 'Social Media Page', 'Math Solver', 'Closest Fast Food',
  'Optimum(Best of Anything)', 'Are We Friend/s', 'Text to Story', 'Story Designer', 'Website Review',
  'Creative Typing', 'Ew my Voice', 'Web Scraper']

  const [username, setUsername] = useState('GreatWordsOfWisdomIsHere!')
  const [serverResponse, setServerResponse] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  // Profile anchor
  const [profileAnchor, setProfileAnchor] = useState(null)
  const open = Boolean(profileAnchor)
  // State of Anchor
  const [profileOpen, setProfileOpen] = useState(false)

  // Sets Username from WebsiteLogin component
  function changeUsername(username) {
    setUsername(username)
  }

  // Changes Server Response in WebsiteLogin component
  function changeServerResponse(server) {
    setServerResponse(server)
  }

  //Hooking profile handler
  function hookProfileAnchor(event){
    setProfileAnchor(event.currentTarget)
    setProfileOpen(!profileOpen)
  }

  // Using this to lift up state
  function loginStatus() {
    setLoggedIn(true)
    dispatch(selectTab('Pandora extravaganza'))
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
      dispatch(selectTab(capTab))
      navigate('/')
      event.preventDefault()
    } else if (tab === 'pandora extravaganza') {
      dispatch(selectTab(capTab))
      navigate('/home')
    } else if (capTab && event) { 
      dispatch(selectTab(capTab))
      navigate(`/${tab}`)
      event.preventDefault()
    }
  }
  
  // Tab factory
  function tabFactory(name) {
    // Capitalize the first letter of a string
    const capName = name === 0 ? '' : name.charAt(0).toUpperCase() + name.slice(1)

    switch(name){
      case 'login':
          return (
            <Tab key={capName + '.'} value={capName} label={capName} sx={{
              color: 'white', 
              display: loggedIn === true ? 'none' : 'default',
              marginLeft: loggedIn === true ? 'default' : '5rem'
            }} onClick={(event)=>{selectedTab(name, capName, event)}}/>
          )
      case 'menuIcon':
        return ( 
          <Tooltip key={capName} title='Menu'>
            <Tab key={capName} value={capName} sx={{color: 'white', display: loggedIn === true ? 'default' : 'none'}} icon={<MenuRoundedIcon/>} onClick={(event)=>{selectedTab(name, capName, event, true)}}/>
          </Tooltip>
        )
      case 'pandora extravaganza':
        return (
          <Tab key={capName} value={capName} label={capName} sx={{color: 'white', display: loggedIn === true ? 'default' : 'none',}} onClick={(event)=>{selectedTab(name, capName, event)}}/>
        )
      case 'portfolio':
        return (
          <Tab key={capName} value={capName} label={capName} sx={{color: 'white'}} onClick={(event)=>{selectedTab(name, capName, event)}}/>
        )
      case 0:
        return
      default:
        return (
          <Tab key={capName} value={capName} label={capName} sx={{color: 'white', display: loggedIn === true ? 'default' : 'none'}} onClick={(event)=>{selectedTab(name, capName, event)}}/>
        ) 
    }
  }

  // Cookie Grabber
  function getCookie(name) {
    const value = '; ' + document.cookie
    const parts = value.split('; ' + name + '=')
    if(parts.length === 2) return parts.pop().split(';').shift()
  } 

  // Deletes Cookie
  function removeCookie(name) {
    var expires = "expires=" + new Date(0).toUTCString();
    // eslint-disable-next-line no-useless-concat
    document.cookie = name + "=" + "; " + expires;
  }

  useEffect(()=>{
    const url = window.location.href;
    if (url.includes('http://localhost:3000/home') || url.includes('https://pandora-extravaganza.herokuapp.com/home')) {dispatch(selectTab('Pandora extravaganza'))} 
    else if (url.includes('http://localhost:3000/portfolio') || url.includes('https://pandora-extravaganza.herokuapp.com/portfolio')) {dispatch(selectTab('Portfolio'))} 
    else if (url.includes('http://localhost:3000/') || url.includes('https://pandora-extravaganza.herokuapp.com/')) {dispatch(selectTab('Login'))}
  })

  useEffect(()=>{if (getCookie('access_token') === undefined) {setLoggedIn(false)} else setLoggedIn(true)},[])
  useEffect(()=>{if (getCookie('access_token') === undefined) {setLoggedIn(false)} else setLoggedIn(true)},[loggedIn])
   
  return (
    <main id ='Website' component="main">
      <ThemeProvider theme={theme}>
      <Box sx={{boxShadow: '0 0 .5rem 4px black'}} className='NavBar'>

        {/* Menu SideBar */}
        <Drawer open={sideBar} PaperProps={{sx: {background: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)'}}} onClose={()=>{toggleDrawer()}}>
          {/* Top of the SideBar drawer */}
          <ThemeProvider theme={sideBarFont}>
            <Typography sx={{ background: 'linear-gradient(to right, #ef32d9, #89fffd)', textAlign: 'center', height: '3rem', fontSize: '2rem'}}>
              {`Wassup, ${username}!`}
            </Typography>
          </ThemeProvider>
          {mainTabs.map((item, index)=>{return listMainTabs(item)})}
        </Drawer>

        <Tabs key='navBar' value={tabStorage} >
           {navBarTabs.map(item=>{return tabFactory(item)})}
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
        <MenuItem onClick={()=>{
          setLoggedIn(false)
          removeCookie('access_token')
          dispatch(selectTab('Login'))
          setServerResponse(null)
          navigate('/')
        }}>
          <ListItemIcon>
            {/* Size of the Icon */}
            <Logout fontSize='small'/>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Routes>
        <Route path='/' element={<WebsiteLogin 
        loginStatus={loginStatus} changeUsername={changeUsername} 
        changeServerResponse={changeServerResponse} 
        serverResponse={serverResponse} />}/>
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
    accessToken: state.accessToken,
  }
}
export default connect(GrabbingStorage)(App);
 