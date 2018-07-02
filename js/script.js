var pageurl = {
  "signup":"html/signup.html",
  "login":"html/login.html",
  "navbar":"html/navbar.html",
  "table":"html/table.html"
}
var tableContent = [{firstname: "mayank",lastname: "gandhi", email:"mayank@gmail.com", age: "22"},
  {firstname: "jaspreet",lastname: "singh", email:"host.jaspreet19@gmail.com", age: "21"},
  {firstname: "Akshay",lastname: "kumar", email:"akshaykumarkaduplicate@gmail.com", age: "22"},
  {firstname: "atul",lastname: "kumar", email:"atulya@gmail.com", age: "42"},
  {firstname: "amit",lastname: "bhawsar", email:"amrita@gmail.com", age: "23"},
  {firstname: "shubham",lastname: "katotiya", email:"katotinikiya@gmail.com", age: "24"},
  {firstname: "ram",lastname: "manohar", email:"mohotohikar@gmail.com", age: "21"}
  ]
var users = [];

// load content

var loadNavbar = function(){
  $('#navbar').load(pageurl.navbar,function(){

  });
};
var loadSignup = function(){
  $('#content').load(pageurl.signup,function(){
    onSignupLoad();
  });
}
var loadLogin = function(){
  $('#content').load(pageurl.login,function(){
    onLoginLoad();
  });
}
var loadTable = function(){
  $('#content').load(pageurl.table,function(){
    onTableLoad();
  });
}

// After Loading

var onNavbarLoad = function(){
  $('#navbar').on('click', '#signup', function(){
    loadSignup();
  });
  $('#navbar').on('click', '#login', function(){
    loadLogin();
  });
  $('#navbar').on('click', '#home', function(){
    loadTable();
  });
};
var onTableLoad = function(){
  var tableBody = $('tbody');
  var row;
  for(row in tableContent){
    var tr = tableContent[row];
    var tableRow = $('<tr></tr>');
    for(col in tr){
      // console.log(tr[col]);
      var th = $('<th></th>').text(tr[col]);
      tableRow.append(th);
    }
    tableBody.append(tableRow);
  }
  $('#mytable').DataTable({
    "pageLength": 3,
  "lengthMenu": [[2, 3, 5, -1], [2, 3, 5, "All"]]
});
};
var onSignupLoad = function(){
  $('#signupform').submit(function(){
    if(validateSignup()){
      console.log('Valid Credentials');
      $('#helpblock').text('Valid Credentials');
      // var sure = confirm("Are you sure you want to submit");

      //   console.log(sure);

      // if(!sure){
      //   console.log("not sure");
      //   return;
      // }
      var newUser = {
        email: $('#email').val(),
        password: $('#pwd').val(),
        name: $('#name').val(),
        age: $('#age').val()
      }
      users.push(newUser);
      // console.log(newUser);
      loadLogin();
    }
  });
  return false;
};
var onLoginLoad = function(){
  $('#onlogin').click(function(){
    var email = $('#email').val();
    var password = $('#pwd').val();
    for(var i in users){
      if(email == users[i].email && password == users[i].password){
        loadTable();
        return;
      }
      // console.log(users[i]);
    }
    $('#helpblock').text('Invalid username or password');
  });
}

// validation

var validateEmail = function(){
  var email = $('#email').val();
  // console.log("result: ");
  var pattern = /\w+\@\w+\.com/;
  var result = email.match(pattern);
  // console.log(result);
  if(result != null){
    $('#email').parent().parent().removeClass("has-error");
    $('#helpblockemail').text('');
    return true;
  }

  $('#helpblockemail').text('Invalid email');
  $('#email').parent().parent().addClass("has-error");
  return false;
}
var validatePassword = function(){
  var password = $('#pwd').val();
  // var pattern = /^(\w*[!@#$%]+\w*){6,20}$/;
  var pattern = /\w*[!@#$%]+\w*/;
  var result = password.match(pattern);
  // console.log(result);
  if(result != null){
    $('#pwd').parent().parent().removeClass("has-error");
    $('#helpblockpassword').text('');
    return true;
  }

  $('#helpblockpassword').text('Your password must be 6-20 characters long, contain letters and numbers, and must contain a special character');
  $('#pwd').parent().parent().addClass("has-error");
  return false;
}
var validateName = function(){
  var name = $('#name').val();
  var pattern = /^[a-zA-Z\s\.]{3,20}$/;
  var result = name.match(pattern);
  // console.log(result);
  if(result != null){
    $('#name').parent().parent().removeClass("has-error");
    $('#helpblockname').text('');
    return true;
  }

  $('#helpblockname').text('Your name must be 3-20 characters long,should contains letters only');
  $('#name').parent().parent().addClass("has-error");
  return false;
}
var validateAge = function(){
  var age = $('#age').val();
  if(age >= 18){
    $('#age').parent().parent().removeClass("has-error");
    $('#helpblockage').text('');
    return true;
  }

  $('#helpblockage').text('You must be atleast 18 years old');
  $('#age').parent().parent().addClass("has-error");
  return false;
}

var validateSignup = function(){
  var allCheck=true;
  if(!validateEmail()){
    allCheck=false;
  }

  if(!validatePassword()){
    allCheck=false;
  }

  if(!validateName()){
    allCheck=false;
  }

  if(!validateAge()){
    allCheck=false;
  }

  return allCheck;
}

$(document).ready(function () {

  onNavbarLoad();
  loadNavbar();
  loadSignup();
});
