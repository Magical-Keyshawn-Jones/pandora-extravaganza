import './PortfolioCss.css'
import { portfolioInfo } from './variables'
import { Divider, Button } from '../../Storage/MuiExports'
import { images } from '../../Storage/images'
/* 
    Fix Projects being too big. It's being shoved in my face
*/
export default function Portfolio() {
    // Keeps Track of project-container dom after mounting
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
                <p>Place: <span>{item.place}</span></p>
                <p>status: {item.status}</p>
                <p>program: <span>{item.program}</span></p>
                <p>yearGraduated: {item.yearGraduated}</p>
            </div>
        )
    }

    const buttonTheme = {
        height: '2rem',
        color: 'black'
    }
    
/* 
    Fix Projects being too big. It's being shoved in my face
*/

    function projectFactory(project) {
        
        function toggleDescription () {
            const testing = document.getElementsByClassName('project-description')
            testing[0].classList.toggle('description-visible')
        }

        return (
            <div className='project-container'>
                <img src={project.image} alt='homepage'/>
                <div className='project-buttons'> 
                    <Button sx={buttonTheme}><a href={project.github} target='_blank' rel='noreferrer'>Code</a></Button>
                    <Button sx={buttonTheme} onClick={()=>{toggleDescription()}}>Description</Button> 
                    <Button sx={buttonTheme}><a href={project.website} target='_blank' rel='noreferrer'>Website</a></Button>
                </div>
                <p className='project-title'>{project.title}</p>
                <div className='project-description'>
                    <p>{project.description}</p>
                </div>
            </div>
        )
    }

    return (
        <main className='PortfolioMain' id='website-padding'>
            <header>
                <div className='Profile-Image'>
                    <img src={images.portfolio.Profile_Pic2} alt='Profile' />
                </div>
                {/* Make the title very magical */}
                <div className='Portfolio-Title-Container'>
                    <div className='Portfolio-Title'> 
                        <h4>Keyshawn Jones</h4> 
                        <h4>Full-Stack Developer</h4>
                    </div>
                    <div>
                        <img src={images.portfolio.Portfolio_Wallpaper1} alt='wallpaper' />
                    </div>
                </div>
            </header> 
 
            <section> 
                <div className='Portfolio-LeftBar'>
                    <div className='Portfolio-Contact'>
                        <h1>Contact/languages & Frameworks</h1>
                        <p className='Portfolio-LeftBar-Item'><span>Name:</span> Keyshawn Jones</p>
                        <p className='Portfolio-LeftBar-Item'><span>Email:</span> Keyshawnjones29@gmail.com</p> 
                        <p className='Portfolio-LeftBar-Item'><span>Phone#:</span> (573)-722-2850</p>
                        <a href='https://github.com/Magical-Keyshawn-Jones' target='_blank' rel='noreferrer'><p className='Portfolio-LeftBar-Item'><span>Github:</span> Magical-Keyshawn-Jones</p></a>
                        <a href='https://www.linkedin.com/in/keyshawn-jones-a399a122a' target='_blank' rel='noreferrer'><p className='Portfolio-LeftBar-Item'><span>LinkedIn:</span> Keyshawn Jones</p></a>
                        <p className='Portfolio-LeftBar-Item'><span>Languages:</span> HTML/CSS, LESS, JavaScript, Node.js, Express, TypeScript, Python, Java</p>
                        <p className='Portfolio-LeftBar-Item'><span>Frameworks:</span> React, Django, FastAPI, Flask, Angular, SpringBoot, Jest, Cypress</p>
                        <p className='Portfolio-LeftBar-Item'><span>Databases:</span> SQLite, PostgreSQL</p>
                        <p className='Portfolio-LeftBar-Item'><span>Skills:</span> Debugging, Git Version Control, Testing, REST/CRUD API, Data Structures, Algorithms, Redux, React Hooks, Responsive Design, Authentication</p>
                    </div>
                </div>

                <div className='Portfolio-Projects'>
                    <h1>Projects</h1>
                    {/* <p>Maybe List languages and have sort/filter by language option</p> */}
                    {portfolioInfo.projects.map(item => {return projectFactory(item)})}
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