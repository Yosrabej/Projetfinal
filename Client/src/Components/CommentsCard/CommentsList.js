import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe } from "../../Redux/actions/posts";
import CommentCard from "./CommentCard";

function CommentsList() {
    const post = useSelector((state) => state.postReducer.post);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getRecipe());
    }, []);

    let itemsToRender;
    if (post.comments) {
        itemsToRender = post.comments.map((comment) => {
            return <CommentCard key={comment._id} comment={comment} />;
        });
    } else {
        itemsToRender = "Loading...";
    }
    return <div>{itemsToRender}</div>;
    // return (
    //     <div>

    //         {post &&
    //             post.comments.map((comment, i) => (
    //                 <CommentCard key={comment._id} comment={comment} />
    //             ))}
    //     </div>
    // );
}

export default CommentsList;

// const post = useSelector((state) => state.postReducer.post);

// // const dispatch = useDispatch();
// // useEffect(() => {
// //     dispatch(getRecipe());
// // }, [dispatch]);
// return (
//     <div>
//         {post.comments.map((comment, i) => (
//             <CommentCard key={comment._id} comment={comment} />
//         ))}
//     </div>
// );
// }
