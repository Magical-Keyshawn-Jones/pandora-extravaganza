import './Homepage.css'

// Create a tab with "The end is never the end is then end" => infinite scroll
export default function Homepage() {

    function everFactory(word) {
        const letters = word.split('')
        const spanLetters = letters.map((item, index) => {
            return item = <span key={index} className='EverHeader'>{item}</span>
        })  
        
        return spanLetters.map(item => {return item})
    }

    function fatabulousFactory(sentence) {
        const wordArray = sentence.split(' ')
        const spanWords = wordArray.map((item, index) => {
            return item = <h4 key={index} className='fatabulousHeader'>{item} </h4>
        })
        return spanWords.map(item => {return item})
    }

    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach((entry) => {
    //         entry.target.classList.toggle('pink', entry.isIntersecting)
    //         if(entry.isIntersecting) {
    //             observer.unobserve(entry.target)
    //         }
    //     })
    // }, {
    //     threshold: 0
    // })

    // useEffect(()=>{
    //     const elements = document.querySelectorAll('.Box')
    //     elements.forEach((element => observer.observe(element)))
    // },[])

    return (
        <main className='Homepage'>
            <header>
                <div className='HomeHeaderTitle'>
                    <div className='PandoraContainer'>
                        <h1 className='PandoraTitle'>Pandora </h1> <h1 className='PandoraTitle'> Extravaganza!</h1>
                    </div>
                    <div className='FatabulousContainer'>
                        {fatabulousFactory("So fatabulous you'll never want to leave!")}
                    </div>
                    <h4>{everFactory('...ever')}</h4>       
                </div>
            </header>
        </main>
    )
}