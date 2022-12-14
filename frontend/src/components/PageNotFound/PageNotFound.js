import './PageNotFoundCss.css';
// Give information on what went wrong and don't redirect them

export default function PageNotFound() {
    return (
        <main className='Error'>
            <p>Error:404 Page not found</p>
        </main>
    )
}