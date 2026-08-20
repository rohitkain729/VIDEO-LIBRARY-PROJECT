
import { Sidebar } from '../sidebar/sidebar';
import './admin-dashboard.css';
import BasicBars from './dash-components/BasicBars';
import ShinyBarChartHorizontal from './dash-components/ShinyBarChartHorizontal';

export function AdminDashboard(){

    return (
        <div className="fs-1  bg-white  py-3 dashboard border-black border-1">
            <div className='row  px-4'>
            <div className='col-1 me-5'>
                <Sidebar/>
            </div>
            {/* <div className='col-1'></div> */}
            <div className='ms-5 col-10 dashboard-content text-danger'>
                <div className='h5 text-center bg-white p-2 rounded-2'>ADMIN DASHBOARD</div>
                <hr />
                <div className='row row-cols-2'>
                    <div className='col'><ShinyBarChartHorizontal/></div>
                    <div className='col'><BasicBars/></div>
                </div>
            </div>

            </div>
        </div>
    );
}