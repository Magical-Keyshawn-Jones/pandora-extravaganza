import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { selectTab } from './Storage/Redux';
// Material Ui imports
import { 
  AccountCircleRoundedIcon, Button, Box,  Drawer, 
  List, ListItem, ListItemButton, 
  ListItemText, Tabs, Tab,  
  MenuRoundedIcon
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
*/

function App(props) {
  const { tabStorage } = props
  const navigate = useNavigate()
  // Used to interact with redux
  const dispatch = useDispatch()
  // Sidebar main tabs
  const mainTabs = ['Portfolio', 'HomePage', 'Bible City', 'Shopaganza', 'Pandorian'] 
  const [currentTab, setCurrentTab] = useState('Login')
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
  const tabList = ['menuIcon', 'login', 'homePage', 'example']
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

  // Tab Styles

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
        <Tabs>
          {['profileIcon'].map(item=>{return tabFactory(item)})}
        </Tabs>
      </Box>
      <Routes>
        <Route path='/' element={<WebsiteLogin/>}/>
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
 