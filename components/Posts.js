import Post from './Post';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { db } from '../firebase';
const posts = [
    {
        id: 124,
        username:'keninsl',
        userImg:'https://links.papareact.com/3ke',
        img:'https://picsum.photos/id/350/800',
        caption:'Kedinin'
    },{
        id: 125,
        username:'keninsl',
        userImg:'https://links.papareact.com/3ke',
        img:'https://picsum.photos/id/237/800',
        caption:'Kedinin'
    },{
        id: 129,
        username:'keninsl',
        userImg:'https://links.papareact.com/3ke',
        img:'https://picsum.photos/id/238/800',
        caption:'Kedinin'
    },
]


function Posts() {
    const[posts, postsSet] = useState([]);
    useEffect(() => onSnapshot(
            query( collection(db, 'posts'), orderBy('timestamp', 'desc')),
            (snapshot)=>postsSet(snapshot .docs))
        , [db]);

    console.log(posts)
    return (
        <div>
            {posts.map(post=>(
                <Post key={post.id} id={post.id} 
                postdetail ={{username:post.data().username, 
                              userImg:post.data().profileImg,
                              img:post.data().image,
                              caption:post.data().caption
                            }} />
            ))}
        </div>
    )
}

export default Posts
