import { images } from "../../Storage/images"
// Rework this so I can do this from my backend. So I can update my side at anytime without vscode
const portfolioInfo = {
    projects: [
        {
            title: 'Pandora Extravaganza',
            description: 'My Portfolio/Full-Stack website that will host all my React/Django/SQLite projects',
            languages: 'JavaScript, Python, SQL, CSS',
            framework: 'React, Django, SQLite',
            image: images.portfolio.projects.pandora_extravaganza,
            github: 'https://github.com/Magical-Keyshawn-Jones/pandora-extravaganza.git',
            website: 'https://pandora-extravaganza.vercel.app/',
        },
        {
            title: 'Land of Gaming',
            description: 'Portfolio, KnuckleBones, TicTackToe, unfinished Login API',
            languages: 'JavaScript, Python, SQL, CSS',
            framework: 'Django, React, SQLite',
            image: images.portfolio.projects.land_of_gaming,
            github: 'https://github.com/Magical-Keyshawn-Jones/land_of_gaming.git',
            website: 'https://land-of-gaming.vercel.app/',
        },
        {
            title: 'LittleFuzzy',
            description: 'First Website created that I used to test my React State/Hooks, and API skills',
            languages: 'JavaScript, HTML/CSS',
            framework: 'React, Express',
            image: images.portfolio.projects.LittleFuzzyWebsite,
            github: 'https://github.com/Magical-Keyshawn-Jones/littlefuzzy.git',
            website: 'https://littlefuzzy.vercel.app/',
        },
        {
            title: 'Advanced Web Applications',
            description: 'Created a website using  context API which logged articles and displayed relevant coding information. Used hooks to incorporate functionality which allowed  users to create, delete, and edit articles',
            languages: 'JavaScript, CSS',
            framework: 'React, Express',
            image: images.portfolio.projects.Advanced_Web_Applications,
            github: 'https://github.com/Magical-Keyshawn-Jones/web-sprint-challenge-advanced-web-applications.git',
            website: false,
        },
        {
            title: 'React Router Movies',
            description: 'Built a website that shows all movies from an API Created a feature that allows users to see the movie information after they click on the movie card',
            languages: 'JavaScript, HTML/CSS',
            framework: 'React',
            image: images.portfolio.projects.React_Router_Movies,
            github: 'https://github.com/Magical-Keyshawn-Jones/React-Router-Movies.git',
            website: false,
        },
        {
            title: 'Authentication and Testing',
            description: 'Built an API that allows users to Register, Login, and then have access to a protected endpoint Encoded passwords when registering so that only authorized users can login Included a feature that stores encoded passwords and users in a relational database',
            languages: 'JavaScript, SQL',
            framework: 'React, SQLite',
            image: false,
            github: 'https://github.com/Magical-Keyshawn-Jones/web-sprint-challenge-authentication-and-testing.git',
            website: false,
        },
        // {
        //     title: '',
        //     description: '3',
        //     languages: '',
        //     framework: '',
        //     image: '',
        //     github: '',
        //     website: '',
        // },
    ],

    experience: [
        {
            title: 'Unilever, Sikeston,MO - Supplemental Handpacker',
            timeWorked: '2021-2021',
            description: [
                'Ensured top quality of ice cream by analyzing each product  and communicated findings to management',
                'Prepared and organized ice cream into boxes and set on a pallets to allow workers to have merchandise on time and to ship out to vendors',
            ]
        },
        {
            title: 'Buffalo, Sikeston, MO - Cashier',
            timeWorked: '2020-2021',
            description: [
                'Communicated  with customers over the phone and in person to create orders',
                'Organized and prepared food bag orders to ensure customers received  everything  ordered',
                'Provided excellent customer service by checking in on guests, ensuring proper seating and communicating with servers making sure guests had a great dining experience'
            ]
        },
    ],

    education: [
        {
            place: 'BloomTech(Lambda School)',
            status: 'Graduate',
            program: 'Full-Stack Web Development',
            yearGraduated: '2022-2022',
        }
    ]
}

export {
    portfolioInfo
}