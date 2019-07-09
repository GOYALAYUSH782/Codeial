{
    let createComment = function(){
        let commentForm = $('#new-comment-form');
        commentForm.submit((e)=>{
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url:'/comments/create',
                data:commentForm.serialize(),
                success: function(data){
                    let newComment= commentDom(data.data.comment);
                    $("#post-comments-list>ul").prepend(newComment);
                    new Noty({
                        text:"Comment Created successfully", 
                        type: 'success', 
                        theme: "mint", 
                        timeout: 5000, 
                        closeWith:['click', 'button'], 
                        progressBar: true}).show();
                    delComment($('.delete-comment-button',newComment));
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
            
        });
    };

    let commentDom = function(comment){
         return $(`<li id="comment-${ comment._id }">
                        <p>
                            ${ comment.content }
                        <a class="toggle-like-button" data-likes="${ 0 }" href="/likes/toggle/?id=${ comment._id }&type='Comment'">
                            0 Likes
                        </a>
                            <br>
                            <small>
                                ${ comment.user.name }
                            </small>
                        </p>
                    </li>
                `);
    };

    let delComment = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                // type:'get',
                // url:$(deleteLink).prop('href'),
                // success:function(data){
                //     console.log(data);
                //     console.log(data.data.comment_id);
                //     $(`comment-${data.data.comment._id}`).remove();
                //     new Noty({
                //         text: data.data.message,
                //     }).show();
                // },
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    console.log(data);
                    console.log(data.data.comment_id);
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        text: data.data.message,
                    }).show();
                },
                type:'get',
                url:$(deleteLink).prop('href'),
                success:function(data){
                    console.log(data);
                    console.log(data.data.comment_id);
                    $(`#comment-${data.data.comment_id}`).remove();
                    new Noty({
                        text:"Comment Deleted successfully", 
                        type: 'error', 
                        theme: "mint", 
                        timeout: 5000, 
                        closeWith:['click', 'button'], 
                        progressBar: true}).show();
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })
        })
    };

    let delAll = function(){
        let buttons = $('.delete-comment-button');
        for(i of buttons){
            delComment(i);
        }
    }

    delComment();
    createComment();
}