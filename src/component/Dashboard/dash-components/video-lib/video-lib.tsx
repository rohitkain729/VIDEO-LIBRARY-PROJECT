import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToLibrary } from "../../../video-redux/slicer/SaveVideoSlicer";
import store from "../../../video-redux/store/store";

export function VideoLib(){

 const[cookie] = useCookies(["UserId","UserName","Role"]);

   const dispatch = useDispatch();

   interface  Video  {
     VideoId: number,
    Description: string,
    Url: string,
    Title: string,
    CategoryId: number,
   }

   
     const[videos,setVideos] = useState([{
          VideoId: 0,
          Description: "",
          Url: "",
          Title: "",
          CategoryId: 0,
        }]);

        let  numberVideo=store.getState().store.VideoCount;

        useEffect(()=>{
        axios.get("http://localhost:4000/videos").then((res)=>{
            setVideos(res.data)
        }).catch((err)=>{
            console.log(err);
        });
    },[numberVideo]);


    function SaveVideoLater(video:Video){
        alert("video selected");
        dispatch(addToLibrary(video));
    }

    return (
        <div>
            <div className="h4 text-center bg-warning p-2 rounded-2 mt-2 d-flex">
                <div>VIDEO LIBRARY</div>
                <div className="offset-9"><i className="bi bi-camera-video-fill"></i> <span className="position-absolute top-10  translate-middle badge rounded-pill bg-danger" style={{fontSize:"10px"}}>{store.getState().store.VideoCount}</span></div>
            </div>

           {
           <div className="row row-cols-3">
            {
                videos.map((video,index)=>(
                    <div className="col mb-4" key={index}>
                        <div className="card">                 
                        <iframe height="250"  src={video.Url}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"  allowFullScreen frameBorder="0"></iframe>
                        <div className="card-body">
                            <p className="card-text-user-desc">{video.Title.substring(0,100)}</p>
                            {/* <a href="#" >Comment</a> */}
                            <Link to={`/user-lib/user-comments/${cookie.UserId}/${cookie.UserName}/${video.VideoId}`} className="btn btn-primary">Comment</Link>
                            <button onClick={()=>SaveVideoLater(video)} className="btn btn-warning offset-5">Watch Later</button>
                        </div>
                        </div>

                    </div>
                ))

            }
           </div> 
           
           }
        </div>
    )
}