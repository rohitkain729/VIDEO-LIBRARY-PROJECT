import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './comments.css';
import { useFormik } from "formik";
import ReactStars from 'react-stars'



export function CommentPage(){

    let params = useParams();
    let UserId = params.UserId;
    let VideoId = params.VideoId;
    let userName = params.UserName;

    const[userData,setUserData]=useState({
        UserId:'',Password:'',UserName:'',Role:''
    });

    const[msg,setMsg]=useState("");

    function ClearMsg(){
        setMsg("");
    }

    const[videoData,setVideoData]=useState({
        VideoId: 0,
          Description: "",
          Url: "",
          Title: "",
          CategoryId: 0,
    });


    useEffect(()=>{
        axios.get(`http://localhost:4000/users/${UserId}`)
        .then((res)=>{setUserData(res.data)}).catch((err)=>{
         console.log(err.message);
        });
        axios.get(`http://localhost:4000/videos/${VideoId}`)
        .then((res)=>{setVideoData(res.data)}).catch((err)=>{
         console.log(err.message);
        });
    },[UserId,VideoId]);

    function dislikeChange(newvalue:number){
        console.log(newvalue);
    }

    // rate
     const[dislikerate,setDislikeRate] = useState<number>(0);
     const[likerate,setLikeRate] = useState<number>(0);
     const[commentValue,setCommentValue] = useState<string>('');

       const disLikeRatingChanged = (newRating:number) => {
            setDislikeRate(newRating);
             console.log(newRating);
        }
        const  LikeRatingChanged= (newRating:number)=>{
            setLikeRate(newRating);
        }

        function disapperValue(){
            setDislikeRate(0);
            setLikeRate(0);
        }

        function handleComment(e : ChangeEvent<HTMLTextAreaElement>){
           setCommentValue(e.target.value);
        }

// formik

     const Commentformik = useFormik({
     initialValues: {
       User_Comments: commentValue,
       Likes: likerate,
       Dislikes: dislikerate,
       UserId:UserId,
       CreatedAt: new Date(),
       VideoId:VideoId
     },

     enableReinitialize:true,
     onSubmit: (value) => {
        console.log(value);
       axios.post("http://localhost:4000/comments",value).then((res)=>setMsg(res.data)).catch(err=>setMsg(err.message));
       setTimeout(() => {
        window.location.reload();
       }, 2000);
     },
   });

    return (
        <div className="comment-container p-3">
            <div className="d-flex justify-content-between mb-2">
            <Link to="/user-lib" className="btn btn-info" style={{width:"120px"}}>Back</Link>
                <h3 className="text-center" style={{color:"#c34a36"}}>Comment Form</h3>
                <div></div>
            </div>
            <div  style={{backgroundColor:'#fefedf'}}>
            <div className="card p-2 comment-card " >
               
                <iframe src={videoData.Url} frameBorder="0" className="rounded-2 card-img-top"  allowFullScreen></iframe>
                <div className="card-body comment-container-body">
                <form onSubmit={Commentformik.handleSubmit}>
                  <dl>
                    <dt>Comment</dt>
                    <dd>
                        <textarea onChange={handleComment} value={commentValue} name="Comment" id="Comment" rows={3}  className="form-control"
                       
                        ></textarea>
                    </dd>

                    <div className="like-dislike row mt-1">
                        <div className="col-2  d-flex align-items-center">
                            <dt>Likes</dt>
                        </div>
                        <div className="col-3">
                            <dd> 
                                 <ReactStars  value={likerate}  edit={true} half={false} count={5}
                                onChange={LikeRatingChanged} size={30} />
                               </dd>
                        </div>
                    </div>

                    <div className="like-dislike row" style={{marginTop:"-18px"}}>
                        <div className="col-2 d-flex align-items-center">
                            <dt>Dis-Likes</dt>
                        </div>
                        
                        <div className="col-3">
                            <dd>
                               <ReactStars color2={"#c43b3b"} value={dislikerate}  edit={true} half={false} count={5}
                                onChange={disLikeRatingChanged} size={30} />
                            </dd>
                        </div>
                    </div>
                    <div className=" d-flex justify-content-end" style={{marginTop:"-18px"}}>
                        <button type="button" onClick={disapperValue} className="btn btn-warning">Reset Like-Dislike</button>
                    </div>
                    
                  </dl>
                    <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
                    <symbol id="check-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                    </symbol>
                    <symbol id="info-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </symbol>
                    <symbol id="exclamation-triangle-fill" viewBox="0 0 16 16">
                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </symbol>
                    </svg>

                    <button type="submit" className="btn btn-primary" style={{marginTop:"-18px"}}>Save</button>
                    {
                      (msg.length > 0)?  <div className="alert alert-primary mt-2 d-flex justify-content-between" role="alert"><svg  width="20" height="20" className="bi flex-shrink-1 me-3 mt-1" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill"/></svg>

                           <div> {msg}</div>
                           <button  onClick={ClearMsg} type="button" className="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div> : ""
                     }
                </form>


<br />
<br />
<br />
<br />
                    
                </div>



            </div>
            </div>
        </div>
    );


}