import { images } from "../../Storage/images"
// Rework this so I can do this from my backend. So I can update my side at anytime without vscode
const portfolioInfo = {
    projects: [
        {
            title: 'Pandora Extravaganza',
            description: 'My Portfolio/Full-Stack website that will host all my React/Django/SQLite projects',
            languages: 'JavaScript, Python, SQL',
            framework: 'React, Django, SQLite',
            image: images.portfolio.projects.pandora_extravaganza,
            github: 'https://github.com/Magical-Keyshawn-Jones/pandora-extravaganza.git',
            website: 'https://pandora-extravaganza.vercel.app/',
        },
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