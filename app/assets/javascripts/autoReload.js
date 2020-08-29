$(function(){
  function buildHTML(message){
    if ( message.image) {
      let html =`<div class="MessageField__list" data-message-id=${message.id}>
                   <div class="MessageField__info">
                     <div class="MessageField__UserName">
                       ${message.user_name}
                     </div>
                     <div class="MessageField__date">
                       ${message.created_at}
                     </div>
                  </div>
                  <div class="MessageField__message">
                    <p class="Message__content">
                      ${message.content}
                    </p>
                    <img class="Message__image" src="${message.image}">
                  </div>
                 </div>`
                 return html;
    } else {
      let html = `<div class="MessageField__list" data-message-id=${message.id}>
                    <div class="MessageField__info">
                      <div class="MessageField__UserName">
                        ${message.user_name}
                      </div>
                      <div class="MessageField__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="MessageField__message">
                      <p class="Message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>`
                  return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.MessageField__list:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.MessageField').append(insertHTML);
        $('.MessageField').animate({ scrollTop: $('.MessageField')[0].scrollHeight});
    }
  })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});