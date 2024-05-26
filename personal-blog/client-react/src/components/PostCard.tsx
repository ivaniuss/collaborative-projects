import image from '../img/ofice.webp'

function PostCard(props) {
    return (
    <a href="">
      <div className="max-md:max-w-96 md:max-w-80  bg-slate-800 text-center max-md:h-[30rem] md:h-[26rem] rounded-3xl overflow-hidden hover:-translate-y-6 transition">
        <img src={props.image} alt="" className='mb-5'/>
        <div className='px-5'>
        <h3 className="max-md:text-2xl md:text-lg mb-1">{props.title}</h3>
        <h4 className="max-md:text-lg md:text-base text-slate-500 mb-3">{props.time}</h4>
        <p className="max-md:text-lg md:text-base break-words text-base overflow-hidden overflow-ellipsis">{props.description}</p>
        </div>
      </div>
    </a>

    )
  }
  
  export default PostCard