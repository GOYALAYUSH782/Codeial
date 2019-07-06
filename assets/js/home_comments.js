{
    let createComment = function(){
        let commentForm = $('.posts-comment');
        commentForm.submit((e)=>{
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url:'/comments/create',
                data:commentForm.serialize(),
                success: function(data){
                    console.log(data);
                    let newComment= commentDom(data.data.comment);
                    $("#post-comments-list>ul").prepend(newComment);
                },
                error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    };

    let commentDom = function(comment){
         return $(`<li id="comment-${ comment.id }">
                        <p>
                            ${ comment.content }
                                <a class="delete-comment-button" href="/comments/destroy/${ comment.id }">X</a>
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
                type:'get',
                url:$(deleteLink).pror('href'),
                succes:function(data){
                    $(`comment-${comment.id}`).remove();
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