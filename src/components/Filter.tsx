'use client'
import { FC} from 'react'

interface FilterProps {
    filter:string;
    setFilter: React.Dispatch<React.SetStateAction<string>>;
    
}

const Filter: FC<FilterProps> = ({ filter,setFilter}) => {
    

    return (
        <div className='flex mt-5 justify-center items-center gap-3'>
        <label >Filter by :</label>
        <select className='border-black p-1.5 text-sm bg-white w-[50%] ' onChange={(e) => setFilter(e.target.value)}>
          <option >Default</option>
          <option >Nearest</option>
          <option >Volunteers Only</option>
          <option > Organization Only</option>
          <option >Latest</option>
{/*sda <select> option value   */}
        </select>
      </div>
    )
}

export default Filter