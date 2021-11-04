import {signOut, useSession } from "next-auth/react"


function MiniProfile() {
    const {data: session} = useSession();
    console.log(session);
    return (
        <div className='flex items-center justify-between mt-14 ml-10' >
            <img src={session?.user?.image}
            className='rounded-full border p-1  w-16 h-16 ' />  
            
            <div  className='flex-1 mx-4'>
                <h2 className='font-bold'>{session.user.username}</h2>
                <h3 className='text-sm text-grey-300'>Instagrammer</h3>
            </div>
            <button
                onClick={signOut}
                className='text-blue-400 text-sm font-semibold
            '>Sign Out</button>
        </div>
    )
}

export default MiniProfile
