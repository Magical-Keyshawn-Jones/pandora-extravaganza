// Homepage Styles for MUI elements
const CustomStyles = {
    profileToolTip: {
      sx: {
        justifySelf: 'right'
      }
    },
    
    profileMenuPaperProp: {
      sx: {
        background: 'linear-gradient(to right, #8e9eab, #eef2f3)',
        width: '10%',
        fontSize: '3rem',
        margin: '0 0 0 -1rem',
      }
    },

    profileMenuFont: {
      sx: {
        fontSize: '10rem'
      }
    },

    profileTooltipAvatar: {
      height: '2rem',
      width: '2rem',
      marginRight: '1rem',
    },

    divider1: {
      sx: {
        borderColor: 'black', 
      }
    },

    profileMenuItems: {
      profile: {
        container: {
          display: 'flex',
          justifyContent: 'space-around',
        },
        icon:{
          height: '1.8rem',
          width: '1.8rem',
        },
        text: {
          fontSize: '1.4rem'
        }
      },
      
      settings: {
        container: {
          display: 'flex',
          justifyContent: 'space-around',
        },
        icon:{
          height: '1.8rem',
          width: 'auto',
        },
        text: {
          fontSize: '1.4rem'
        }
      }
    }
  }

export {
    CustomStyles
}