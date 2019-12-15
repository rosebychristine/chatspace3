$(function() {
  function appendUsers(user) {
  var html = `
  <div class = "chat-group-user clearfix">
  <p class = "chat-group-user__name">${user.name}</p>
  <div class = "user-search-add chat-group-user__btn chat-group-user__btn-add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
  </div>`;
  $("#user-search-result").append(html);
}
function appendNoUsers(info) {
  var html =`<div class="chat-group-user clearfix">
  <p class="chat-group-user__name">ユーザーが見つかりません</p>
  </div>`
  }

  function appendDeleteUser(name, id) {
    let html = `
    <div class="chat-group-user clearfix" id="${id}">
      <p class="chat-group-user__name">${name}</p>
      <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${id}" data-user-name="${name}">削除</div>
    </div>`;
    $(".js-add-user").append(html);
  }
  function appendMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
// }

  $("#user-search-field").on("keyup", function() {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
          $('#user-search-result').empty();
          // フォームの文字列長さが0であれば、インクリメンタルサーチ結果を表示しないようにする
          if (input.length !== 0) { 
            users.forEach(function(user){ // users情報をひとつずつとりだしてuserに代入
              appendUsers(user)
        });

      } else if (input.length == 0) {
          return false;
        } else {
          appendNoUsers();
        }
      })

      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
  });

// $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn-add", function() {
$(document).on("click", ".chat-group-user__btn-add", function() {
  const userName = $(this).attr("data-user-name");
  const userId = $(this).attr("data-user-id");
  $(this)
      .parent()
      .remove();
    appendDeleteUser(userName, userId);
    appendMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
  });