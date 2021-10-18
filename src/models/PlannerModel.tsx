import columnModel from './columnModel'
import userModel from './userModel'
export default interface plannerModel {


    CreatedAt: String,
    desciption: string
    name: string
    stages: columnModel,
    tasks: [{
        StageId: string,
        TaskId: string,
        _id: string   
    }],
users: userModel[],
    _id: string

}