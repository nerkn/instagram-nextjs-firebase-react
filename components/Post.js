
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from '@firebase/firestore';
import { async } from '@firebase/util';
import {SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, MenuIcon, DotsHorizontalIcon, ChatIcon, BookmarkIcon, EmojiHappyIcon} from '@heroicons/react/outline'
import {HomeIcon, HeartIcon as HeartIconFilled}  from '@heroicons/react/solid'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { db } from '../firebase';

function Post(post) {
    const {data:session} = useSession()
    const [comm,  commSet] = useState('')
    const [comms, commsSet] = useState([])
    const [likes, likesSet] = useState([])
    const [hasliked, haslikedSet] = useState(false)
    const sendComment = async (e)=>{
        e.preventDefault();
        const commentToSend = comm;
        commSet('');
        await addDoc(collection(db, 'posts', post.id, 'comments'),{
            comment: commentToSend,
            username: session.user.username,
            userImg: session.user.image,
            timestamp: serverTimestamp()
        })
    }
    const likePost= async e=>{
        e.preventDefault();
        if(hasliked){
            await deleteDoc(doc(db, 'posts', post.id, 'likes', session.user.uid))
        }else{
               await setDoc(doc(db, 'posts', post.id, 'likes', session.user.uid),{
            username:session.user.username
        })
        }
    }
    useEffect(() => onSnapshot(
        query(collection(db, "posts", post.id, "comments")),
        orderBy("timestamp", "desc"),s=>commsSet(s.docs))
        ,[db] )
        useEffect(()=>onSnapshot(collection(db,'posts',post.id,'likes'), s=>likesSet(s.docs)),
        [])
    useEffect(
      ()=>haslikedSet(likes.findIndex(like=> (like.id==session?.user?.uid)) !== -1 ),
      [likes] )
    let d = post.postdetail;
    return (
        <div className='bg-white my-7 border rounded-sm'>

            {/* Header */}
            <div className='flex items-center p-5'>
                <img src={d.userImg} className='rounded-full h-12 w-12 object-contain border p-1 mr-3'  />
                <p className='flex-1 font-bold'>{d.username}</p>
                <DotsHorizontalIcon className='h-5' />
            </div>
            <img src={d.img} className='object-cover w-full' />
            
            {session && (
                <div className='flex justify-between px-4 pt-4 '>
                <div className='flex space-x-4'>
                    {hasliked ? (
                        <HeartIconFilled onClick={likePost} className='btn' />
                    ):(
                        <HeartIcon onClick={likePost} className='btn' />

                    )}
                    <ChatIcon className='btn' />
                    <PaperAirplaneIcon className='btn' />
                </div>
                    <BookmarkIcon className='btn' />
                </div>
            )}
            <div className='p-5 truncate'>
                {likes.length>0 &&(
                    <p className='font-bold mb-1'>{likes.length} likes</p>
                )}
                <span className='font-bold mr-1'>{d.username}</span>
                {d.caption}
            </div>
            {/* Comments */}
            {comms.length>0 &&(
                <div className='ml-10 h-20 overflow-y-scroll 
                scrollbar-thumb-black scrollbar-thin'>
                    {comms.map(c=>(
<div key={c.id} className='flex items-center space-x-2 mb-3'>
    <img className='h-7 rounded-full' src={c.data().userImg} />
    <div className='text-sm flex-1'>
        <span className='font-bold'>{c.data().username}</span>{" "} 
        {c.data().comment}
    </div>
    <Moment fromNow className='pr-5 text-xs' >{c.data().timestamp?.toDate()}</Moment>
</div>
                    ))}

                </div>
            ) }
            {/* inputbx */}
            {session && (
                <form className='flex items-center p-4'>
                    <EmojiHappyIcon  className='h-7'/>
                    <input type='text' value={comm}
                    onChange={e=>commSet(e.target.value)}
                    placeholder='Add comment ...'
                    className='border-none flex-1 focus:ring-0 outline-none '/>
                    <button
                     type='submit'
                     disabled={!(comm && comm.trim())}
                     onClick={sendComment}
                     className='font-semibold text-blue-300'>Post</button>
                </form>
            )}
        </div>
    )
}

export default Post