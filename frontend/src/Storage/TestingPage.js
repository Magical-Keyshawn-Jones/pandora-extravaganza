import { useState } from "react"
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from "@mui/material"
import { Container, Tab, Tabs, Box, Typography } from "./MuiExports"
import '../components/PageNotFound/PageNotFoundCss.css'
import DessertPhoto from './Images/RandomPhotos/Dessert1.jpg'

export default function TestingPage() {
    const [ currentTab, setCurrentTab ] = useState('Home')
    // const boxes = ['Box', 'Box', 'Box','Box', 'Box', 'Box','Box', 'Box', 'Box',]
    const boxes = ['Desserts']
    const details = ['Cookies', 'Pie', 'Muffins', 'Root Beer float', 'Ice cream', 'Peace Cobbler']
    const boxDetails = {
        Desserts: {
            div: <p> A awesome list of amazing and delicious food of delicious edibleness! </p>,
            clicked: false
        }
    }
    const [orderBoxes, setOrderBoxes ] = useState(boxDetails)
    
    function tabSelector(tab){ 
        setCurrentTab(tab)
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#f8bbd0',
            }
        }
    })

    function boxFactory(word, index) {
        return(
            <div>
                <img src={DessertPhoto} alt='food'/>
            </div>
        )
    }

    function listFactory(word) {
        return (
            <li>{word}</li>
        )
    }

    // Elements
   const Main = styled('div')(({ theme }) => ({
        paddingTop:'5rem',
        background: 'grey',
        position: 'fixed',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'auto', 

        // BreakPoints
        [theme.breakpoints.down('lg')]: {
            background: 'white'
        },

        [theme.breakpoints.down('sm')]: {
            background: 'purple'
        }
   }))

   const TestBox = styled('div')(({ theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem',
   }))

   const TestContainer = styled('div')(({ theme }) => ({
        background: 'pink',
        height: '30rem',
        width: '30rem',
   }))

    return (
        <ThemeProvider theme={theme}>
            <Main>
                {/* <TestBox>
                <Tabs value={currentTab}>
                    <Tab sx={{fontSize: '5rem'}} label='Home' value='Home' onClick={()=>{tabSelector('Home')}}/>
                    <Tab label='Profile' value='Profile' onClick={()=>{tabSelector('Profile')}}/>
                    <Tab label='Settings' value='Settings' onClick={()=>{tabSelector('Settings')}}/>
                </Tabs>
                </TestBox>
                <TestContainer>
                    <Typography sx={{
                        fontSize: '5rem' 
                    }}>This message is brought to you by FedEx</Typography>
                </TestContainer> */}
                <div className='GoodieBox' onClick={()=>{
                    setOrderBoxes({ ...orderBoxes, Desserts: {...orderBoxes.Desserts, clicked: !orderBoxes.Desserts.clicked} })
                }}>
                    <div className={orderBoxes.Desserts.clicked === false ? 'ListItems' : 'ListItems ItemsMoveLeft'}>
                        <ul>
                            {details.map(item => {return listFactory(item)})}
                        </ul>
                    </div>
                    <div className='DessertBox'>
                        {boxes.map((item, index) => {return boxFactory(item, index)})}
                    </div>
                    <div className={orderBoxes.Desserts.clicked === false ? 'Details' : 'Details DetailsMoveRight'}>
                        {orderBoxes.Desserts.div}
                    </div>
                </div>
            </Main>
        </ThemeProvider>
    )
}