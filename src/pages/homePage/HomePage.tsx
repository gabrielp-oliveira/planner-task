import React, {useEffect, useState} from 'react'
import './HomePage.css'
import { Link } from 'react-router-dom'

import Planner from '../../assets/svg/planner.svg'
import task from '../../assets/svg/task.svg'
import taskSteps from '../../assets/svg/taskSteps.svg'
import Curve from '../../assets/shapes/curve'
import Waves from '../../assets/shapes/Waves'
import portfolioExample from '../../assets/img/portfolioExample.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faLaptop } from '@fortawesome/free-solid-svg-icons'





function HomePage() {
    const [width, setWidth ] = useState<number>(400)

    useEffect(() => {
        if(window.screen.width < 400){
            setWidth(window.screen.width-30)
        }
    }, [])

    window.addEventListener('resize',(e: any) => {
        if(window.screen.width < 400){
            setWidth(window.screen.width-30)
        }else{
            setWidth(400)
        }
    })
    return (
        <div className="HomePage">
            <div className="HomePageHeader">
                <Link to="/profile">profile</Link>
                <div>

                    <Link to="/login">log in</Link>
                    <Link to="/register">register</Link>
                </div>
            </div>
            <div className="bodyHome">
                <div className="" style={{ maxHeight: '700px' }}>
                    <h3>Just a simple Planner</h3>
                    <div>
                        <p>inspired in the Microsoft Planner, this tool helps you  to create a  simple and visual way to organize work that is updated in real time for the entire team.</p>
                        <img src={task} alt="" width={width} className="iconAbout" />

                    </div>
                    <br />
                    <div>
                        <p>create and organize your demands and tasks according to your <span className="textTarget"> team's </span> needs.</p>
                        <img src={Planner} alt="" width={width} className="iconAbout" />
                        <p>solutions and task changes will be <span className="textTarget">updated in real time</span>, so even working <span className="textTarget">remotely and concurrently</span> with other people, the planner will update to <span className="textTarget">everyone</span> at the same time.</p>
                    </div>
                </div>
                <div className="bodyHomeBody">


                </div>

                <div style={{ position: "relative" }}>
                    <div style={{ position: "relative" }}><Waves /></div>
                    <div style={{
                        marginTop: '-1px',
                        background: "linear-gradient(180deg, rgba(47,41,112,1) 0%, rgba(23,18,69,1) 100%)"
                    }}>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                    <div style={{ background: "#171245" }}>
                        <div className="about">
                            <h2 className="">About</h2>
                            <span className="">"Use my knowledge to improve and test my skills as a <span className="textTarget">programmer</span> ".🚀</span>
                            <p className="">This project is part of my <a href="https://gabrielp-oliveira.github.io/" target="_blank" rel="noreferrer"> <span className="textTarget">
                                portfolio </span></a> , so feel free to get in touch for feedback on the code, structure or other reason that will help me become a better programmer!</p>
                            <br />
                            {/* <img src={portfolioExample} alt="" /> */}
                            <div>
                                <a href="https://github.com/gabrielp-oliveira" target="_blank">
                                    <FontAwesomeIcon icon={faGithub} />
                                </a>
                                <a href="https://www.linkedin.com/in/gabriel-97-oliveira" target="_blank" >
                                    <FontAwesomeIcon icon={faLinkedin} />
                                </a>
                                <a href="https://gabrielp-oliveira.github.io/" target="_blank">
                                    <FontAwesomeIcon icon={faLaptop} />
                                </a>
                            </div>
                        </div>


                    <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap', paddingBottom: '50px'}}>

                        <div className="functionalities">
                            <h2 className="">Functionalities</h2>
                            <div className="">
                                <li className="">Register and login a personal account.</li>
                                <li className="">Saved all the tasks and planner in a database</li>
                                <li className="">update all changes to everyone at the same time.</li>
                                <li className="">limit the acess of a user depending of her acess.</li>
                                <li className="">get the info of the the planner aand your tasks, like the finished and in progress tasks and  users taks.</li>
                            </div>
                        </div>


                        <div className="observations">
                            <h2 className="">Observations</h2>

                            <p>you can find the front-end repository <a href="https://github.com/gabrielp-oliveira/planner-task">here</a>, and the back-end <a href="https://github.com/gabrielp-oliveira/planner-task-node">here</a>.</p>
                            <p>This app is hosted on heroku free plan, meaning that on the initial load, the server mat neet to start which can cause a delay.</p> </div>

                        </div>
                    </div>
                </div>
            </div>
                <div className="footer">
                    <span >Designed & Developed by <a href="https://github.com/gabrielp-oliveira" target="_blank">Gabriel P. Oliveira</a></span>

                </div>
        </div>
    )
}

export default HomePage
