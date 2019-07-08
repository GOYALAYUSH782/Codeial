{
    // method to submit from for new post using ajax
    let createPost=()=>{
        let newPostForm = $('#new-post-form');
        newPostForm.submit((e)=>{
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url: "/posts/create-post",
                data: newPostForm.serialize(),
                success: (data)=>{
                    //console.log(data);
                    let newPost= newPostDom(data.data.post);
                    $("#posts-list-container>ul").prepend(newPost);
                    new Noty({
                        text:"Post Created successfully", 
                        type: 'success', 
                        theme: "mint", 
                        timeout: 5000, 
                        closeWith:['click', 'button'], 
                        progressBar: true}).show();
                    deletePost($('.delete-post-button',newPost));
                },
                error: (error)=>{
                    console.log(error.resposeText);
                }

            })
        })
    };
    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${ post._id}">
                    <p>
                        ${ post.content }
                            <a class="delete-post-button"  href="/posts/destroy/${ post._id }">X</a>
                        <br>
                        <small>
                        ${ post.user.name }
                        </small>
                        <div class="posts-comment">
                                <form method="POST" action="/comments/create">
                                    <input type="text" name="content" placeholder="Type here..." required>
                                    <input type="hidden" name="post" value="${ post._id }">
                                    <button type="submit">Comment</button>
                                </form>
                        </div>
                        <div id="post-comments-list">
                            <ul id="post-comments-${ post._id}">
                            </ul>
                        </div>
                    </p>
                </li>
    `)
    };

    //method to iterate over all post  delete button
    let iterdel = function(){
        var loop = $('.delete-post-button');
        for(i of loop){
            deletePost(i);
        }
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type:'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    console.log(data);
                    new Noty({
                        text:"Post Deleted successfully", 
                        type: 'error', 
                        theme: "mint", 
                        timeout: 5000, 
                        closeWith:['click', 'button'], 
                        progressBar: true}).show();
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function(error){
                    console.log(error.resposeText);
                }
            })
        })
    }
    createPost();
    iterdel();
}