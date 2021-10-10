import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';

import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@material-ui/core/Button';
import ErrorModal from '../Modal/errorModal';

function PlannerStart({ formInfo, stage, currentInfo }: any) {

    const plaannerName = useRef<HTMLInputElement>(null);
    const plannerDescription = useRef<HTMLInputElement>(null);
    const [info, setInfo] = useState<any>({ plannerDescription: '', plaannerName: '' })
    const [errorInfo, setErrorInfo] = useState<string>()
    const [callError, setCallError] = useState<boolean>()

    function callNextStage() {

        if ( info.plaannerName?.trim() !== '') {
            formInfo(info)
            stage(1)
        } else {
            setErrorInfo('field name cannot be empty, fill in correctly.')
            setCallError(true)
        }
    }
    useEffect(() => {
        setInfo(currentInfo)
    }, [currentInfo])

    return (
        <>

            <div className="newPlannerStage">
                <span>lets start</span>

                <div>
                    <div>
                        <TextField id="standard-basic" label="Planner Name" 
                            fullWidth
                            ref={plaannerName}
                            value={info?.plaannerName} onChange={(e) => setInfo({
                                plaannerName: e.target.value,
                                plannerDescription: info.plannerDescription
                            })} />

                    </div>
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline fullWidth
                            rows={4}
                            defaultValue={info?.plannerDescription}
                            ref={plannerDescription} 
                            value={info?.plannerDescription} onChange={(e) => setInfo({
                                plannerDescription: e.target.value,
                                plaannerName: info.plaannerName})}
                        />

                    </div>
                </div>
                <p>
                    <Link to="/profile"><Button >
                    <FontAwesomeIcon icon={faBackward} />
                        </Button></Link>
                    <Button onClick={callNextStage}><FontAwesomeIcon icon={faForward} /></Button>
                </p>
            </div>
            <ErrorModal status={callError} setStatus={setCallError} info={errorInfo}/>
        </>
    )
}

export default PlannerStart
