import React from 'react';

const Message = ({ pseudo, message, isUser }) => {

    if(isUser(pseudo)){
        return (
            <div className="userMessage">
                    <p className="userMessage__messageContent">{ message }</p>
            </div>
        );
    }
    else{
        return (
            <div className="not-userMessage">
                <span className="not-userMessage__pseudo">{ pseudo }</span>
                <p className="not-userMessage__messageContent">{ message }</p>
            </div>
        );
    }

};

export default Message;