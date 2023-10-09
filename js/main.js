function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}



function getUsers() {
  const localStorageUsers = localStorage.getItem('users')
  return localStorageUsers ? JSON.parse(localStorageUsers) : []
}

function setUsers(users) {
  localStorage.setItem('users', JSON.stringify(users))
}

$(function() {
  const users = getUsers()

  $('#button-register').click(function() {
    let formValid = true
    const formValues = {
      fullname: $('#fullname').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      rePassword: $('#re-password').val(),
    }

    if (!formValues.fullname) {
      formValid = false
      alert('Bạn chưa nhập họ tên!');
      return
    }
    if (!formValues.email || !validateEmail(formValues.email)) {
      formValid = false
      alert('Email không hợp lệ!');
      return;
    }
    if (!formValues.password || formValues.password.length < 6) {
      formValid = false
      alert('Mật khẩu không hợp lệ!');
      return; 
    }
    if (!formValues.rePassword || formValues.rePassword !== formValues.password) {
      formValid = false
      alert('Lặp lại mật khẩu không hợp lệ!');
      return;       
    }

    if (formValid) {
      alert('Register success');

      delete formValues.rePassword;
      //add user
      users.push(formValues)
      setUsers(users);
      
    } else {
      alert('Register failed');
    }
  });

  $('#button-reset').click(function() {
    $('#form-register')[0].reset()
  })
  $('#button-login').click(function(){
    const users = getUsers()
    const email = $('#email').val()
    const password = $('#password').val()
    if (email&& password){
      if (users.find(user => user.email===email && user.password===password)){
        alert('Đăng nhập thành công!')
        window.location.href = 'https://www.facebook.com/profile.php?id=100005570175814'
      }
    }else{
      alert('Đăng nhập thất bại')
    }

  })
  $('#button-register-login').click(function() {
    window.location.href = 'http://127.0.0.1:5500/9-storage/index.html'
    })
});

