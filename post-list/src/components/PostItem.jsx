import MyButton from "./UI/button/MyButton";

const PostItem = (props) => {
    return (
        <div className='post'>
            <div className='post_content'>
                <strong>{props.number}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className='post_btn'>
                <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    )
}

export default PostItem;