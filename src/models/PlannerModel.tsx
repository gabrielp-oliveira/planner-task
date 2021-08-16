import userInfo from '../models/UserInfo'

export default interface plannerModel {


    CreatedAt: String,
    desciption: string
    name: string
    stages: [{
        StageDesc: string,
        StageName: string,
        _id: string,
    }]
    tasks: object[],
    users: userInfo[]

}