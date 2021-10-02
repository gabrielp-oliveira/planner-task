import TaskModel from './taskModel'

export default interface columnModel {
    [index: number]: { 
        _id?: string;
        StageDesc?: string; 
        StageName?: string;
        tasks?: [TaskModel]
        };

  }