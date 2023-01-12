import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/emilys-candy/400.css'
import axios from 'axios';
import Cookies from 'js-cookie'
import { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { login, logout, selectTab } from './Storage/Redux';
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
  const { accessToken, tabStorage } = props
  const navFont = createTheme({
    typography: {
      fontFamily: ['emilys-candy'].join(',')
    }
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  // Sidebar main tabs
  const bestTabs = ['Portfolio', 'HomePage', 'Bible City', 'Shopaganza', 'Pandorian'] 
  const mainTabs = ['Bible City','Live WebSites', 'Console Games', 'Games', 'Gaming Forum',
  'Shopping Tab', 'News Channel', 'Social Media Page', 'Math Solver', 'Closest Fast Food',
  'Optimum(Best of Anything)', 'Are We Friend/s', 'Text to Story', 'Story Designer', 'Website Review',
  'Creative Typing', 'Ew my Voice', 'Web Scraper']

  const [tabList, setTabList] = useState(['menuIcon', 'login', 'portfolio', 'pandora extravaganza'])

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
    dispatch(selectTab('Pandora extravaganza'))
    dispatch(login('newKeyToken'))
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

    // Takes out login tab if loggedIn is True
    if (name === 'login' && loggedIn === true) {
        setTabList(tabList.filter(item => {return item !== 'login'}))
        return
    }

    switch(name){
      case 'login':
          return (
            <Tab key={capName + '.'} value={capName} label={capName} sx={{color: 'white'}} onClick={(event)=>{selectedTab(name, capName, event)}}/>
          )
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
      case 0:
        return
      default:
        return (
          <Tab key={capName} value={capName} label={capName} sx={{color: 'white'}} onClick={(event)=>{selectedTab(name, capName, event)}}/>
        )
    }
  }

  useEffect(()=>{
    const url = window.location.href;
    if (accessToken !== null) {
    // Use this block of code to send the user back to the login page. set login status to false. Make sure to use dispatch for tabStorage
     return 
    }
    else if (url.includes('home')) {dispatch(selectTab('Pandora extravaganza'))} 
    else if (url.includes('portfolio')) {dispatch(selectTab('Portfolio'))} 
    else {dispatch(selectTab('Login'))}
    console.log(tabStorage)
  })
   
  useEffect(()=>{
        // This is Only to test the would be output if I wasn't using localhost:3000
    axios.get('http://127.0.0.1:8000/users/makeToken')
    .then(res=>{
      Cookies.set('access_token', res.data.access_token)
    })
    .catch(err=>{console.log('tuff', err)})
  },[])

  return (
    <main id ='Website' component="main">
      <ThemeProvider theme={theme}>
        {/* Box-Shadow: H-offset, V-offset, blurRadius, SpreadRadius(optional), Color */}
      <Box sx={{boxShadow: '0 0 .5rem 4px black'}} className='NavBar'>

        {/* Menu SideBar */}
        <Drawer open={sideBar} PaperProps={{sx: {background: 'linear-gradient(to right, #24243e, #302b63, #0f0c29)'}}} onClose={()=>{toggleDrawer()}}>
          <ThemeProvider theme={sideBarFont}><Typography sx={{ background: 'linear-gradient(to right, #ef32d9, #89fffd)', textAlign: 'center', height: '3rem', fontSize: '2rem'}}>
            Wassup, Kiwi!  
          </Typography></ThemeProvider>
          {mainTabs.map((item, index)=>{return listMainTabs(item)})}
        </Drawer>

        {/* <Tabs key='navBar' value={currentTab} > */}
        <Tabs key='navBar' value={tabStorage} >
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
    accessToken: state.accessToken,
  }
}
export default connect(GrabbingStorage)(App);
 