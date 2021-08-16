import api from '../api/api'

export default  api.get('/auth',{
    params: {
      id: localStorage.getItem('UserId')
    }, headers: { authentication: `Bearer ${localStorage.getItem('token')}` }
  })
  