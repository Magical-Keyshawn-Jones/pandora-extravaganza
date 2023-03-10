import './Homepage.css'
import { useEffect, useState } from 'react'
import Party1 from '../../Storage/Images/Homepage/Party1.gif'
import Party2 from '../../Storage/Images/Homepage/Party2.webp'
import Party3 from '../../Storage/Images/Homepage/Party3.gif'


// Create a tab with "The end is never the end is then end" => infinite scroll
export default function Homepage(prop) {
    const { animationStatus } = prop

    // Stops the animationStatus after mounting 
    function everFactory(word) {
        const letters = word.split('')
        const spanLetters = letters.map((item, index) => {
            return item = <span key={index} className='EverHeader' id={animationStatus === true ? '' : 'Static-EverHeader'}>{item}</span>
        })  
        
        return spanLetters.map(item => {return item})
    }

    function fatabulousFactory(sentence) {
        const wordArray = sentence.split(' ')
        const spanWords = wordArray.map((item, index) => {
            return item = <span key={index} className='fatabulousHeader' id={animationStatus === true ? '' : 'Static-fatabulousHeader'}>{item} </span>
        })
        return spanWords.map(item => {return item})
    }

    // Testing react on scroll
    //  useEffect(()=>{
    //     const boxes = document.querySelectorAll('.boxy')

    //     const observer = new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //             entry.target.classList.toggle('MoreTesting', entry.isIntersecting)
    //             // if (entry.isIntersecting) observer.unobserve(entry.target)
    //         })
    //     }, { threshold: .5 })

    //     boxes.forEach(box => {
    //         observer.observe(box)
    //     })
    //  })

    return (
        <main className='Homepage'>
            <header>
                <div className='HomeHeaderImgs' id={animationStatus === true ? '' : 'Static-HomeHeaderImgs'}>
                    <div>
                        <img src={Party1} alt='Party gif'/>
                    </div>
                    <div>
                        <img src={Party2} alt='Party gif'/>
                    </div>
                    <div>
                        <img src={Party3} alt='Party gif'/>
                    </div>
                </div>
                <div className='HomeHeaderTitle'>
                    <div className='PandoraContainer'>
                        <span className='PandoraTitle' id={animationStatus === true ? '' : 'Static-PandoraTitle'}> Extravaganza!</span>
                        <span className='PandoraTitle' id={animationStatus === true ? '' : 'Static-PandoraTitle'}>Pandora </span> 
                    </div>
                    <div className='FatabulousContainer'>
                        {fatabulousFactory("So fatabulous you'll never want to leave!")}
                    </div>
                    <h4>{everFactory('...ever')}</h4>       
                </div>
            </header>

            {/* Testing React on scroll */}
            {/* <div className='boxy-container'>
                <div className='boxy'>
                    <p>Box 1</p>
                </div>
                <div className='boxy'>
                    <p>Box 2</p>
                </div>
                <div className='boxy'>
                    <p>Box 3</p>
                </div>
            </div> */}
        </main>
    )
}