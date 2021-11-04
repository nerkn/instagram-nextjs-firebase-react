import { useSession } from "next-auth/react"
import MiniProfile from "./MiniProfile"
import Posts from "./Posts"
import Stories from "./Stories"
import Suggestions from "./Suggestions"

function Feed() {
    const {data: session} = useSession();

    return (
        <main className={`grid grid-cols-1 md:max-w-3xl xl:max-w-7xl ${session && "md:grid-cols-2          xl:grid-cols-3 "}
         mx-auto  `}>
            <section className='col-span-2'>
                <Stories/>
                <Posts />
            </section>
            {session && (
                
            <section className='hidden xl:inline-grid md:col-span-1' >
                <div className='fixed '> 
                <MiniProfile />
                <Suggestions />
                </div>
            </section>
            )}
        </main>
    )
}

export default Feed
