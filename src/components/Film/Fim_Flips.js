import React from 'react'
// import { NavLink } from 'react-router-dom';
import { history } from '../../App';
import './Fim_Flip.css';
import {PlayCircleOutlined} from "@ant-design/icons"
export default function Fim_Flips(props) {

    const { item } = props;
    console.log('item',item);
    // const [show, setShow] = useState(false);

    return (
        <div className="flip-card mt-5">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    {/* <img src={item.hinhAnh} alt="Avatar" style={{width:300,height:300}} /> */}
                    <img style={{width:300,height:300}} src={item.hinhAnh} alt={item.tenPhim} onError={(e) => {
                        e.target.onError = null;
                        e.target.src = `https://picsum.photos/id/2000/50/50`;}}/>
                </div>
                <div className="flip-card-back" style={{position:'relative',backgroundColor:'rgba(0,0,0,.9)'}}>
                    <div style={{position:'absolute',top:0,left:0}}>
                        <img src={item.hinhAnh} alt="Avatar" style={{width:300,height:300}} />
                    </div>
                    <div className='w-full h-full' style={{ position:'absolute', backgroundColor: 'rgba(0,0,0,.5)', display: 'flex',
                        justifyContent: 'center', alignItems: 'center'}}>
                        <div>
                            <div className="rounded-full cursor-pointer">
                                <PlayCircleOutlined style={{fontSize:'50px'}}/>
                            </div>    
                            <div className='text-2xl mt-2 font-bold'>{item.tenPhim}</div>
                        </div>
                    </div>
                </div>
                {/* <div className="flip-card-back">
                    <h1>{item.tenPhim}</h1>
                    <button>Đặt vé</button>
                </div> */}
            </div>
            <div onClick={()=>{
                history.push(`/detail/${item.maPhim}`)
            }}
             to={`detail/&{item.maPhim}`} className='bg-orange-300 text-center cursor-pointer py-2 bg-indigo-300 my-2 text-success-50 font-bold'>Đặt vé</div>
        </div>

    )
}

