import PostItem from "./PostItem";

const PostList = ({ posts }) => {
    return (
        <div className="container mx-auto p-4 grid grid-cols-1 gap-4">
            {posts.map(item => <PostItem post={item} key={item._id} />)}
        </div>
    );
}

export default PostList;