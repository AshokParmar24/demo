import Image from 'next/image'
import { Inter } from 'next/font/google'
import {useEffect, useState} from "react";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskDetails,setTaskDetails]=useState({
    title:"",
    description:""
  })
  const [list,setList]=useState([])
  console.log("taskDetails",taskDetails)
  useEffect(() => {
    let interval;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused]);

  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const saveTask = () => {
    setShowModal(true)
    setIsPaused(true);
  };
  console.log("list",list)
  const closeModal = () => {
    setShowModal(false);
    setList([...list, {...taskDetails,time:time}])
    setTaskDetails({ title: '', description: '' });
  setTime(0)
  };



  return (
    <div>
      <div>
        <div style={{display:"flex",justifyContent:"center",fontSize:"30px"}}>{new Date(time * 1000).toISOString().substr(11, 8)}</div>
        <div style={{display:"flex",justifyContent:"space-around",marginTop:"10px"}}>
        <button onClick={startTimer}   style={{background:"red",padding:"10px 20px",borderRadius:"10px"}}>
          Start
        </button>
        <button onClick={pauseTimer} disabled={!isActive || isPaused} style={{background:"red",padding:"10px 20px",borderRadius:"10px"}}>
          Pause
        </button>
        <button onClick={saveTask} disabled={!isActive && !isPaused} style={{background:"red",padding:"10px 20px",borderRadius:"10px"}}>
          Save Task
        </button>
        </div>
        {showModal &&
          <div className="modal" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div className="modal-content">
              <div style={{fontSize:"50px"}}>save the task</div>
              <label>Title:</label>
              <input
                  type="text"
                  value={taskDetails.title}
                  onChange={(e) => setTaskDetails({ ...taskDetails, title: e.target.value })}
              />
              <label>Description:</label>
              <input
                  type="text"
                  value={taskDetails.description}
                  onChange={(e) => setTaskDetails({ ...taskDetails, description: e.target.value })}
              />
              <div style={{display :"flex",gap:10 ,marginTop:"10px"}}>
              <button className="close" onClick={closeModal} style={{background:"red",padding:"10px 20px",borderRadius:"10px"}}>Save</button>
              <button onClick={closeModal} style={{background:"red",padding:"10px 20px",borderRadius:"10px"}}>Close</button>
              </div>
            </div>
          </div>
        }
        <table style={{border:"1px solid red" ,margin:"auto", marginTop:"10px"}}  >
          <thead >
          <tr style={{border:"1px solid red"}} >
            <th style={{border:"1px solid red"}}>Title</th>
            <th style={{border:"1px solid red"}}>Description</th>
            <th style={{border:"1px solid red"}}>time</th>
          </tr>
          </thead>
          <tbody style={{border:"1px solid red"}}>
        {
          list&& list.map((v,i)=>{
              const totalSeconds = v.time;

              const hours =Math.floor(totalSeconds / 3600);
              const minutes = Math.floor(hours * 60);
              const seconds = totalSeconds % 60;
              console.log("hours",hours)
              console.log("minutes",minutes)
              console.log("seconds",seconds)
              return(

               <tr key={i} style={{border:"1px solid red"}} >
              <td style={{border:"1px solid red"}}>{v.title}</td>
              <td style={{border:"1px solid red"}}>{v.description}</td>
              <td style={{border:"1px solid red"}}>{`${Math.floor(totalSeconds / 3600)}:${ Math.floor((totalSeconds % 3600) / 60)}:${totalSeconds % 60}`}</td>
            </tr>)
            })
        }
          </tbody>
        </table>
      </div>
    </div>
  )
}
