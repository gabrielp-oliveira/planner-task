export default interface taskModel {
        _id?: string|any;
        CreatedAt?: string; 
        plannerId?: string;
        StageId?: string;
        accountable?: [string?];
        description?: string;
        title?: string;
        tsk?: any,
        taskStatus?:string
        
  }