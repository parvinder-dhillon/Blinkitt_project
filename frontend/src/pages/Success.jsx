
import {useLocation, Link} from 'react-router-dom'


const Success = () => {
    const location = useLocation()
    console.log(location);
    
  return (
    <div className='m-2 w-full max-w-md bg-green-200 p-4 mx-auto py-5 flex flex-col justify-center items-center gap-5'>
       <p className='text-green-800 font-bold text-lg text-center'>{location?.state?.text || "Payment"} Successfully</p>
<Link to='/' className='border border-green-900 px-4 py-1 text-green-900 hover:bg-green-900 hover:text-green-100 transition-all'>
    Go To Home
</Link>
    </div>
  )
}

export default Success