import Image from 'next/image'
import {SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon} from '@heroicons/react/outline'
import {HomeIcon}  from '@heroicons/react/solid'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/dist/client/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalState } from '../atoms/modal'

function Header() {
    const {data: session} =  useSession();
    const [open, setOpen] = useRecoilState(modalState);
    //const open = useRecoilValue(modalState)
    const router = useRouter();
    return (        
        <div className='shadow-sm border-b bg-white sticky top-0 z-50'>
            <div className='flex justify-between max-w-6xl mx-5 lg:mx-auto'>                
                {/*  Logo */}
                <div onClick={()=>router.push('/')} className="relative hidden lg:inline-grid w-24 h-24">
                    <Image src='http://links.papareact.com/ocw' layout='fill' objectFit='contain' />
                </div>
                <div onClick={()=>router.push('/')}  className="relative lg:hidden w-10 h-10 flex-shrink-0">
                    <Image src='http://links.papareact.com/jjm' layout='fill' objectFit='contain' />
                </div>    
                {/*  Search box */}
                <div className="max-w-xs">
                    <div className='mt-1 relative p-3 rounded-md '>
                        <div className='absolute inset-y-0 pl-3 flex items-center '>
                            <SearchIcon className='h-5 w-5 text-grey-500' />
                        </div>
                        <input  type='text' placeholder='Search ...'  
                        className='bg-grey-300 block w-full pl-10 sm:text-sm border-gray focus:ring-black
                        focus:border-black rounded-md'/>
                    </div>
                </div>
                {/* Right */}
                <div className='flex items-center justify-end space-x-4'>
                <HomeIcon onClick={()=>router.push('/')}  className='navBtn' />
                <MenuIcon  className='h-6 md:hidden cursor-pointer' />
                {session ? (
                    <>
                    <div className='relative navBtn'>
                    <PaperAirplaneIcon className='navBtn rotate-45' />
                        <div className='absolute -top-1 -right-2 text-xs
                        w-5 h-5 bg-red-500 rounded-full flex items-center items-center
                    justify-center animate-pulse text-white'>3</div>
                    </div>
                    <PlusCircleIcon  onClick={()=>setOpen(true)}  className='navBtn' />
                    <UserGroupIcon     className='navBtn' />
                    <HeartIcon         className='navBtn' />
                    <img src={session.user?.image} alt='nerkn'
                    className='h-10 w-10 rounded-full cursor-pointer' onClick={signOut} />
                    </>
                ):(
                    <button onClick={signIn}>Sign In</button>
                )}
                </div>
                    
            </div>
        </div>
    )
}

export default Header
