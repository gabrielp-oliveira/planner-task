import api from '../api/api'


export default async function  authPlanner  (id)  {
    return api.post('/planner/auth',{
        params: {
          id: localStorage.getItem('UserId'),
          plannerId: id
        }, headers: { authentication: `Bearer ${localStorage.getItem('token')}` }
      })
}
