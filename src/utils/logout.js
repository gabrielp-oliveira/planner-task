import { createBrowserHistory } from 'history'

function logout (){
    localStorage.clear()
    createBrowserHistory().push('/')
    document.location.reload();
}
export default logout