function Story({img, username}) {
    return (
        <div>
            <img className='h-14 w-14 rounded-full p-[1.5px] border-red-800 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-in-out' src={img} />
            <div className='text-xs w-16 truncate text-center' >{username}</div>
        </div>
    )
}

export default Story
