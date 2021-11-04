
import faker from "faker"
import { useEffect, useState } from "react"
import Story from "./Story";
import { useSession } from "next-auth/react"

function Stories() {
    const [sug, setsug] = useState([]);
    const {data:session} = useSession();
    useEffect(() => {
        const suggestions = [...Array(20)].map((_,i)=> ({
            ...faker.helpers.contextualCard(),
            id:i
        }))
        setsug(suggestions)
    }, [])

    return (
        <div className='flex space-x-2 p-6 bg-white mt-8 border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-transparent'>
            {session && (
                <Story 
                img={session.user.image} 
                username={session.user.username}
                />
            )}
            {sug.map(profile=>(
                <Story key={profile.id} img={profile.avatar} username={profile.username} />
            ))}
            
        </div>
    )
}

export default Stories
