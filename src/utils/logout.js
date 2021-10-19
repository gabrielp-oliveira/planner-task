import { createBrowserHistory } from 'history'

function logout (){
    localStorage.clear()
    createBrowserHistory().push('/planner-task/#/')
    document.location.reload();
}
export default logout