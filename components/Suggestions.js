import { useState, useEffect } from "react"
import faker from 'faker'

function Suggestions() {
    const [suggestions, setSuggestions] = useState([])
    useEffect(() => {
        const suggestions = [...Array(5)].map((_,i)=>({
            ...faker.helpers.contextualCard(),
            key:i, id:i
        }))
        setSuggestions(suggestions);
    }, [])
    return (
        <div className='mt-4 ml-10 '>
        <div className='flex justify-between text-sm mb-5' >
            <h3 className='text-sm font-bold text-gray-400'>Suggs for you</h3>
            <button className='text-gray'> See All</button>
        </div>
        
            {suggestions.map( s=>
        <div key={s.id}
         className='flex items-center justify-between text-sm mb-5' >
            <img src={s.avatar}  className='h-10 w-10 rounded-full  ' /> 
            <div className='flex-1 ml-4'>
                <h2 className='text-sm font-bold'>{s.username}</h2>
                <div className='text-gray-400 text-sm'>works at {s.company.name}</div>
            </div>
            <button className='text-blue-500 text-bold'> Follow</button>
        </div>
            ) }
        </div>
    )
}

export default Suggestions
