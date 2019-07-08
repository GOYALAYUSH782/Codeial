{
    import Noty from 'noty';
    let createComment = function(){
        let commentForm = $('#new-comment-form');
        commentForm.submit((e)=>{
            e.preventDefault();

            $.ajax({
                type: 'POST',
                url:'/comments/create',
                data:commentForm.serialize(),
                success: function(data){
                    //console.log(data);
                    let newComment= commentDom(data.data.comment);
                    $("#post-comments-list>ul").prepend(newComment);
                    new Noty({
                        text: data.data.message,
                    }).show();
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
                                <a class="delete-comment-button" href="/comments/destroy/${ comment._id }">X</a>
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
                url:$(deleteLink).prop('href'),
                success:function(data){
                    console.log(data);
                    console.log(data.data.comment_id);
                    $(`comment-${data.data.comment._id}`).remove();
                    new Noty({
                        text: data.data.message,
                    }).show();
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