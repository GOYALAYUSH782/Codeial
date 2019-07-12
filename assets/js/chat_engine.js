class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox= $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('https://local/5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self=this;
        this.socket.on('connect',function(){
            console.log('connection established using sokets...');
        });

        self.socket.emit('join_room',{
            user_email:self.userEmail,
            chatroom: 'codeial',
        });
        self.socket.on('user_joined',function(data){
            console.log('a user joined!',data);
        });

        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();
            if(msg!=''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email : self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });
        self.socket.on('receive_message',function(data){
            console.log('message recieved', data.message);

            let newMessage = $('<li>');

            let messgaeType = 'other-message';
            
            if(data.user_email==self.userEmail){
                messgaeType = 'self-message';
            }

            newMessage.append($('<span>',{
                'html':data.message,
            }));

            newMessage.append($('<sub>',{
                'html':data.user_email
            }));
            
            newMessage.addClass(messgaeType);
            $('#chat-messages-list').append(newMessage);
        })
    }
}