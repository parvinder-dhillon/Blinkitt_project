import { IoClose } from "react-icons/io5";

const AddField = ({close, value, onChange, submit}) => {
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-black/50 z-50 flex justify-center items-center p-4">
        <div className="bg-white rounded p-4 w-full max-w-md">
           <div className="flex items-center justify-between  gap-1 ">
            <h1 className="font-semibold">Add Field</h1>
            <button
             className="cursor-pointer"
              onClick={close}>
                <IoClose size={25}/>
            </button>
           </div>
<input type="text"
 className="bg-blue-50 my-3 border outline-none focus-within:border-yellow-400 rounded w-full p-2"
 placeholder="Enter field name"
 value={value}
 onChange={onChange}/>

 <button
 onClick={submit}
 className="bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded mx-auto w-fit block">
    Add Fields
 </button>
        </div>
    </section>
  )
}

export default AddField