$(function(){
  function buildHTML(message){
    if ( message.image) {
      let html =`<div class="MessageField__list">
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
      let html = `<div class="MessageField__list">
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
  $('.MessageForm__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.MessageField').append(html)
      $('.MessageField').animate({ scrollTop: $('.MessageField')[0].scrollHeight});
      $('.MessageForm__form')[0].reset();
      $('.MessageForm__send').prop('disabled', false);
    })
    .fail(function(){
         alert("メッセージ送信に失敗しました");
    })
  });
});