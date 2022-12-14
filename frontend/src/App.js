import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { selectTab } from './Storage/Redux';
// Material Ui imports
import { 
  AccountCircleRoundedIcon, Avatar, Box,  Drawer, 
  IconButton, List, ListItemButton, 
  ListItemText, Tabs, Tab, Tooltip, Menu,  
  MenuRoundedIcon, MenuItem,
} from './Storage/MuiExports';
// Component imports 
import { 
  AccountMenu,
  HomePage,
  PageNotFound,
  Portfolio,
  TestingRenders,
  WebsiteLogin,
 } from './components/componentExports';

/* Notes
  @Tabs value might pose a problem if the page refreshes. If thats the case have the value = page url
*/

function App(props) {
  const navigate = useNavigate()
  // Sidebar main tabs
  const mainTabs = ['Portfolio', 'HomePage', 'Bible City', 'Shopaganza', 'Pandorian'] 
  const [currentTab, setCurrentTab] = useState(tabTracker())

  // Profile anchor
  const [profileAnchor, setProfileAnchor] = useState(null)
  // State of Anchor
  const [profileOpen, setProfileOpen] = useState(false)
  // Profile handler
  function hookProfileAnchor(event){
    setProfileAnchor(event.currentTarget)
    setProfileOpen(!profileOpen)
  }

  // Keeps track of current tab
  function tabTracker(){
    const url = window.location.href;
    if (url.includes('homePage')) {
      return 'HomePage'
    } else if (url.includes('example')) {
      return 'Example'
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
            <Box key={tab} sx={{ width: 250}} onClick={()=>{toggleDrawer()}} >
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
    } else if (capTab && event) {
      setCurrentTab(capTab)
      navigate(`/${tab}`)
      event.preventDefault()
    }
  }
  
  // Tab factory
  const tabList = ['menuIcon', 'login', 'homePage', 'example', 'accountMenu']
  function tabFactory(name) {
    // Capitalize the first letter of a string
    const capName = name.charAt(0).toUpperCase() + name.slice(1)
    switch(name){
      case 'login':
        return (
          <Tab key={capName} value={capName} label={capName} href={`/`} sx={{color: 'white'}} onClick={(event)=>{selectedTab(name, capName, event)}}/>
        )
      case 'menuIcon':
        return (
          <Tab key={capName} value={capName} sx={{color: 'white'}} icon={<MenuRoundedIcon/>} onClick={(event)=>{selectedTab(name, capName, event, true)}}/>
        )
      case 'profileIcon':
        return (
          <Tab key={capName} value={capName} sx={{color: 'white'}} icon={<AccountCircleRoundedIcon/>} onClick={(event)=>{selectedTab()}}/>
        )
      default:
        return (
          <Tab key={capName} value={capName} label={capName} href={`/${name}`} sx={{color: 'white'}} onClick={(event)=>{selectedTab(name, capName, event)}}/>
        )
    }
  }

  return (
    <main id ='Website' component="main">
      <Box className='NavBar'>
        <Drawer open={sideBar} onClose={()=>{toggleDrawer()}}>
          {mainTabs.map((item, index)=>{return listMainTabs(item)})}
        </Drawer>
        <Tabs value={currentTab} >
          {tabList.map(item=>{return tabFactory(item)})}
        </Tabs>
        <span>Pandora Extravaganza</span>
        <Tooltip title='Account settings'>
          <IconButton onClick={(event)=>{hookProfileAnchor(event)}} >
            <Avatar sx={{width: '3rem', height: '3rem', background: 'pink', color: 'black',}} >Kiwi</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu anchorEl={profileAnchor} id='account-menu' open={profileOpen} >
        <MenuItem>
          <Avatar /> My Profile
        </MenuItem>
      </Menu>
      <Routes>
        <Route path='/' element={<WebsiteLogin/>}/>
        <Route path='/accountMenu' element={<AccountMenu/>}/>
        <Route path='/homePage' element={<HomePage/>}/>
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
 