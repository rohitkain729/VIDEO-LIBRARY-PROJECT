import { useCookies } from "react-cookie";
import "./admin.css";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { error } from "console";
import { Link, Outlet, useNavigate } from "react-router-dom";

export function AdminLibrary() {
  const [cookie] = useCookies(["UserId", "UserName"]);
  const [categories, setCategories] = useState([
    { CategoryId: 0, CategoryName: "" },
  ]);
  const [message, setMessage] = useState("");

  const[messageStyle,setMessageStyle] = useState("");

  const targetRef= useRef<HTMLDivElement>(null);

  const handlScroll = ()=>{
    targetRef.current?.scrollIntoView({behavior:'smooth'})
  }


  const [videoList, setVideoList] = useState([
    {
      VideoId: 0,
      Description: "",
      Url: "",
      Title: "",
      CategoryId: 0,
    },
  ]);

  const [editVideo, setEditVideo] = useState(
    {
      VideoId: 0,
      Description: "",
      Url: "",
      Title: "",
      CategoryId: 0,
    },
  );

  const addVideoFormik = useFormik({
    initialValues: {
      Description: editVideo.Description,
      Url: editVideo.Url,
      Title: editVideo.Title,
      CategoryId: 0,
    },
    enableReinitialize:true,
    onSubmit: (values) => {
 
      console.log(values);
      console.log(editVideo);

      if(editVideo.CategoryId===0) {
      axios
        .post("http://localhost:4000/videos",values)
        .then((res) => {
            setMessageStyle("alert-primary")
          setMessage(res.data);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
            setMessageStyle("alert-danger")
          setMessage(err.message);
        });
        setTimeout(() => {
        window.location.reload();
      },2000);
      }else{
        axios.put(`http://localhost:4000/video/${editVideo.VideoId}`,values).then((res)=>{setMessage(res.data)
          setTimeout(() => {
          window.location.reload();
          },2000);

        })
        
        .catch((err)=>{
          setMessage(err.message);
         
        })
      }

    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    axios
      .get("http://localhost:4000/videos")
      .then((res) => {
        setVideoList(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    
  }, []);

  const videoStyle = {
    width: "650px",
    marginTop: "10px",
  };

  const deleteVideo = (videoId:number)=>{
         axios.delete(`http://localhost:4000/video/${videoId}`)
         .then(
          (res)=>{
          setMessage(res.data);
         setVideoList((oldvideo)=>
          oldvideo.filter(
            (video)=>video.VideoId !== videoId
          )
        )
      }
        )
         .catch((err)=>setMessage(err.message));
  }

    

  const EditVideo = (videoId:number) =>{
    axios.get(`http://localhost:4000/videos/${videoId}`).then((res)=>{setEditVideo(res.data)}).catch((err)=>{setMessage(err.message)});
  handlScroll();
  
  }



  return (
    <div className="admin-dashboard">
      <div className="d-flex justify-content-between bg-warning p-2 rounded-2">
        <div className="fw-bold fs-4 bi bi-speedometer2">Admin Library <span className="text-muted fs-6">(Video Collections)</span></div>
       
        <div className=" p-1 d-flex justify-content-center gap-3">
          <i className="bi bi-person-circle fs-4"></i>
          <span className="mt-1">{cookie.UserName}</span>
        </div>
      </div>

      {
                (message.length>0?   <div className={`mt-2 alert  w-50 d-flex mx-auto ${messageStyle}`}  role="alert">
        <span className="mx-auto">{message}</span>
            <button type="button" className="btn-close ms-auto"  aria-label="Close"></button>
        </div>
       : "")
            }

      <div className="d-flex justify-content-center mt-5">
        <form 
          onSubmit={addVideoFormik.handleSubmit}
          className="bg-secondary text-white p-4 rounded-3"
          style={videoStyle}
        >
          <div  ref={targetRef} className="form-label h4 p-2 bg-secondary text-white ">
            <i className="bi bi-house-add-fill me-2"></i>Add Videos
          </div>
          <span></span>
          <dl>
            <dt className="form-label">Description</dt>
            <dd>
              <textarea
                id="Description"
                name="Description"
                className="form-control"
                onChange={addVideoFormik.handleChange}
                onBlur={addVideoFormik.handleBlur}
                value={addVideoFormik.values.Description}
              ></textarea>
            </dd>
            <dt className="form-label">Url Code</dt>
            <dd>
              {" "}
              <input
                type="text"
                className="form-control"
                id="Url"
                name="Url"
                onChange={addVideoFormik.handleChange}
                onBlur={addVideoFormik.handleBlur}
                value={addVideoFormik.values.Url}
              />{" "}
            </dd>

            <dt className="form-label">Title</dt>
            <dd>
              {" "}
              <input
                type="text"
                className="form-control"
                id="Title"
                name="Title"
                onChange={addVideoFormik.handleChange}
                onBlur={addVideoFormik.handleBlur}
                value={addVideoFormik.values.Title}
              />{" "}
            </dd>

            <dt>Please Select Category Of Video</dt>
            <dd className="mt-2">
              <select
                className="form-select w-50"
                aria-label="category video"
                name="CategoryId"
                id="CategoryId"
                onChange={addVideoFormik.handleChange}
                onBlur={addVideoFormik.handleBlur}
                value={addVideoFormik.values.CategoryId}
              >
                <option value="">Select the Category</option>
             
                {categories.map((category, index) => (
                  <option
                    className="fw-bold"
                    value={category.CategoryId}
                    key={category.CategoryId}
                  >
                    {category.CategoryName}
                  </option>
                ))}
                
              </select>
            </dd>
          </dl>

          {

          }
          <button type="submit" className="btn btn-warning w-25">
            <i className="bi bi-door-open me-2"></i>Upload
          </button>
        </form>
      </div>

      <div className="bg-black text-white p-3 mt-5 mb-3">
        <h4 className="text-center">
          <i className="bi bi-list-stars me-2"></i>Total Videos List
        </h4>
        <div className="row row-cols-4">
          {videoList.length > 0
            ? videoList.map((video) => (
                <div className="col video-container mb-5" key={video.VideoId}>
                  <div className="card">
                    <iframe
                      className="video-player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      src={video.Url}
                      allowFullScreen
                    ></iframe>

                    <div className="card-body card-body-container">
                      <div className="card-title fs-6 fw-bold card-body-title">
                        {video.Title.substring(0, 90)}
                      </div>
                      <button onClick={()=>deleteVideo(video.VideoId)} className="btn btn-danger me-2">Delete</button>
                       <button onClick={()=>EditVideo(video.VideoId)} className="btn btn-primary me-2">Edit</button>
                       
                      {/* <a href="#" className="btn btn-primary">
                        Edit
                      </a> */}
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
      
    </div>
  );
}
