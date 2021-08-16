import React, { useState, useEffect, FC } from 'react'
import './newPlannerForm.css'
import api from '../../api/api'
import { Link } from 'react-router-dom'

import PlannerStart from '../newPlannerFormElements/plannerStart'
import AddParticipants from '../newPlannerFormElements/addParticipants'
import NewStage from '../newPlannerFormElements/NewStage'
import FormDone from '../newPlannerFormElements/FormDone'


function NewPlannerForm() {

    const [startStage, setStartStage] =
    useState<any>({plannerDescription: '', plaannerName: '' })

    const [addParticipantsStage, setAddParticipantsStage] = useState<any>([])
    const [newStages, setNewStages] = useState<any>([])
    const [currentStep, setCurrentStep] = useState<number>(0)
    const [status, setStatus] = useState<boolean>(false)

    const formComponents = [
        <PlannerStart stage={setCurrentStep} 
        formInfo={setStartStage} currentInfo={startStage}/>,

        <AddParticipants stage={setCurrentStep}
         formInfo={setAddParticipantsStage} currentInfo={addParticipantsStage}/>,
         
        <NewStage step={setCurrentStep}
        formInfo={setNewStages}  currentInfo={newStages} status={setStatus}/>,
        
        <FormDone />
    ]

    function clearValues() {
        setStartStage({plannerDescription: '', plaannerName: '' })
        setAddParticipantsStage([])
        setNewStages([])
        // setCurrentStep(0)
        setStatus(false)
    }

    useEffect(() => {
        if(status){
            api.post('/planner/new',{
                params: {
                    startStage: startStage,
                    addParticipantsStage: addParticipantsStage,
                    newStages: newStages
                }
              })
            .then((data) => {
                clearValues()
            })
        }
    }, [status])


    return (
        <div className="newPlanner">
            <Link to="/profile"> return to profile page</Link>
            
            <div>{formComponents[currentStep]}</div>

        </div>
    )
}

export default NewPlannerForm
