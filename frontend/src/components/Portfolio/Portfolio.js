import './PortfolioCss.css'
// import ProfileImg2 from './images/Profile_Pic2.jpg'
import ProfileImg2 from '../../assets/images/Profile_Pic2.jpg'
import PandoraHomepage from '../../Storage/Images/Portfolio/PandoraHomepage.png'
import { portfolioInfo } from './variables'
import { Divider, Button } from '../../Storage/MuiExports'

export default function Portfolio() {

    function experienceFactory(work) {
        return (
            <div className='Portfolio-Work'>
                <p>{work.title}</p>
                <p>{work.timeWorked}</p>
                <ul>
                    {work.description.map(item => {return (<li>{item}</li>)})}
                </ul>
            </div>
        )
    }

    function educationFactory(item) {
        return (
            <div className='Portfolio-Education'>
                <p>Place: {item.place}</p>
                <p>status: {item.status}</p>
                <p>program: {item.program}</p>
                <p>yearGraduated: {item.yearGraduated}</p>
            </div>
        )
    }

    const buttonTheme = {
        height: '2rem',
        color: 'black'
    }

    function projectFactory(project) {
        return (
            <div className='project-container'>
                <img src={PandoraHomepage} alt='homepage'/>
                <div className='project-buttons'>
                    <Button sx={buttonTheme}>Code</Button>
                    <Button sx={buttonTheme}>Description</Button>
                    <Button sx={buttonTheme}>Website</Button>
                </div>
                <p className='project-title'>Pandora Extravaganza</p>
                <div className='project-description'>
                    <p>
                        This is the description of the thing that they are asking for
                        I don't know if it will look like this but I made sure to make it look long
                        so that way it will be easy to tell them what the description looks like
                    </p>
                </div>
            </div>
        )
    }

    return (
        <main className='PortfolioMain'>
            <header>
                <div className='Profile-Image'>
                    <img src='../../assets/images/Profile_Pic2.jpg' alt='Profile' />
                </div>
                {/* Make the title very magical */}
                <div className='Portfolio-Title'>
                    <h4>Keyshawn Jones</h4> 
                    <h4>Full-Stack Developer</h4>
                </div>
            </header>

            <section>
                <div className='Portfolio-LeftBar'>
                    <div className='Portfolio-Contact'>
                        <h1>Contact/languages & Frameworks</h1>
                        <p><span>Name:</span> Keyshawn Jones</p>
                        <p>Email: Keyshawnjones29@gmail.com</p> 
                        <p>Phone#: (573)-722-2850</p>
                        <p>Github: <a href='https://github.com/Magical-Keyshawn-Jones' target='_blank' rel='noreferrer'>Magical-Keyshawn-Jones</a></p>
                        <p>LinkedIn: <a href='https://www.linkedin.com/in/keyshawn-jones-a399a122a' target='_blank' rel='noreferrer'>Keyshawn Jones</a></p>
                        <p><span>Languages:</span> HTML/CSS, LESS, JavaScript, Node.js, Express, TypeScript, Python, Java</p>
                        <p>Frameworks: React, Django, FastAPI, Flask, Angular, SpringBoot, Jest, Cypress</p>
                        <p><span>Databases:</span> SQLite, PostgreSQL</p>
                        <p><span>Skills:</span> Debugging, Git Version Control, Testing, REST/CRUD API, Data Structures, Algorithms, Redux, React Hooks, Responsive Design, Authentication</p>
                    </div>
                </div>

                <div className='Portfolio-Projects'>
                    <h1>Projects</h1>
                    {/* <p>Maybe List languages and have sort/filter by language option</p> */}
                </div>
                
                <div className='Portfolio-RightBar'>
                    <h1>Education/Experience</h1>
                    {portfolioInfo.experience.map(item => {return experienceFactory(item)})}
                    <Divider sx={{ borderColor: 'black', marginBottom: '1rem'}}/>
                    {portfolioInfo.education.map(item => {return educationFactory(item)})}
                </div>
            </section>
        </main>
    )
}