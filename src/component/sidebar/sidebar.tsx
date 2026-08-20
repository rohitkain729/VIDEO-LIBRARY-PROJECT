import { useCookies } from 'react-cookie'
import './sidebar.css'

export function Sidebar(){
    const[cookie] = useCookies(["UserId","UserName","Role"])

    return (
        <div className="side-bar fs-6 d-flex justify-content-between align-items-center">
            <div className='admin-panel'>
                {
                    <span className='text-center'>{cookie.Role}</span>
                }
            </div>
            <div className='signout'>
                 <span>Signout <i className=" ms-2 bi bi-box-arrow-right"></i></span>
            </div>
        </div>
    )
}
