import './App.css';

function App() {
    let animate = false
    return (
        <div>
            {/* {animate} */}
            <div>
                <img src="http://lorempixel.com/800/600/cats" />
            </div>
            <div className={`fade-in-image ${animate ? 'fade-out': ''}`}>
                <img src="https://source.unsplash.com/fk4tiMlDFF0/800x600/" />
            </div>

            {/* <button onClick={() => animate = !animate}>test</button> */}
        </div>
    )
}

export default App

