import { Link } from 'react-router-dom'
import './homepage.css'
import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'

const Homepage = () => {

    const [typingStatus, setTypingStatus] = useState("human1")

    return (
        <div className='homepage'>
            <img src="/orbital.png" alt="" className='orbital'/>
            <div className="left">
                <h1>RUI AI</h1>
                <h2>Supercharge your creaticity and productivity</h2>
                <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, magni quis? Eius vero ipsum totam sed, voluptatibus modi itaque omnis provident libero perspiciatis, ab sit placeat, eveniet recusandae id saepe!
                </h3>
                <Link to="/dashboard">Get Started</Link>
            </div>
            <div className="right">
                <div className="imgContainer">
                    <div className="bgContainer">
                        <div className="bg"></div>
                    </div>
                    <img src="/bot.png" className='bot'/>
                    <div className="chat">
                        {/* check the typingStatues, if it's human1 then show img for human1, else check the other two */}
                        <img src={typingStatus === "human1" ? "/human1.jpeg" : typingStatus === "human2" ? "/human2.jpeg" : "/bot.png"} alt="" />
                        <TypeAnimation
                            sequence={[
                                'Human: We produce food for Mice',
                                2000, ()=>{
                                    setTypingStatus("bot");
                                },
                                'Bot: We produce food for Hamsters',
                                2000, ()=>{
                                    setTypingStatus("human2");
                                },
                                'Human2: We produce food for Guinea Pigs',
                                2000, ()=>{
                                    setTypingStatus("bot");
                                },
                                'Bot: We produce food for Chinchillas',
                                2000, ()=>{
                                    setTypingStatus("human1");
                                },
                            ]}
                            wrapper="span"
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                        />
                    </div>
                </div>
            </div>
            <div className="terms">
                <img src="/logo.png" alt="" />
                <div className="links">
                    <Link to="/">Terms of Service</Link>
                    <Link to="/">Privacy Policy</Link>
                </div>
            </div>
        </div>
    )
}

export default Homepage