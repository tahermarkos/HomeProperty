function signUp(role) {
    let firstName = document.getElementById("firstName").value;
    let verifFN = firstName.length > 4;
    if (verifFN === false) {
      document.getElementById("FNError").innerHTML = "first name should be at least 5 letters"
      document.getElementById("FNError").style.color = "red"
    }else{
      document.getElementById("FNError").innerHTML = "";
    };

    let lastName = document.getElementById("lastName").value;
    let verifLN = lastName.length > 4;
    if (verifLN === false) {
      document.getElementById("LNError").innerHTML = "last name should be at least 5 letters"
      document.getElementById("LNError").style.color = "red"

    }else{
      document.getElementById("LNError").innerHTML = ""
    };


    let email = document.getElementById("email").value;
    let verifEmail = checkEmail(email);
    if (verifEmail === false) {
      document.getElementById("emailError").innerHTML = "email invalid"
      document.getElementById("emailError").style.color = "red"
    }else{
      document.getElementById("emailError").innerHTML = ""
    };


    let password = document.getElementById("password").value;
    let verifPass = checkPass(password);
    if (verifPass === false) {
      document.getElementById("passError").innerHTML = "password should include at least letters are numbers"
      document.getElementById("passError").style.color = "red"
    }else{
      document.getElementById("passError").innerHTML = ""
    };

    let PNumber = document.getElementById('PhoneNumber') != null ? document.getElementById('PhoneNumber').value : ""

    console.log("eeeeeeeeeeeee",PNumber);
    let Address = document.getElementById('Address') != null ? document.getElementById("Address").value : ""


   if (verifFN && verifLN && verifEmail && verifPass) {
     let userId = JSON.parse(localStorage.getItem("userId") || "0")
     let T = JSON.parse(localStorage.getItem("users") || "[]")
     let info = {
        firstName: firstName,
         lastName: lastName,
         email: email,
          PhoneNumber: PNumber,
         Address: Address,
         password: password,
         role: role
     };
      info.id = userId;
      T.push(info)
      localStorage.setItem("users", JSON.stringify(T));
     localStorage.setItem("userId", JSON.stringify(userId + 1));
     location.replace("signin.html");
   }
}

function checkEmail(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
}
function checkPass(password) {
    let passw =  /^[A-Za-z]\w{7,14}$/;
  return passw.test(password);
}

function login() {
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("password").value;
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === phone && users[i].password === password) {
          localStorage.setItem("connectedUser", JSON.stringify(users[i].id));
          if (users[i].role === ("admin" || "owner") ) {
            window.location = "users-list.html";
          }
          if (users[i].role === "user") {
            window.location = "public/index.html";
          }
        } else {
          document.getElementById("loginError").innerHTML = "Username or Password invalid"
          document.getElementById("loginError").style.color = "red"
        }
      } 
}

function IdChecker(key, id) {

  let T = JSON.parse(localStorage.getItem(key) || "[]");


  for (let i = 0; i < T.length; i++) {
    if (Number(T[i].id )=== Number(id)) {
      return T[i];
    }
  }
}

function header() {
  let header = `
  <a href="client/register.html" class="aa-register">Register</a>
  <a href="signin.html" class="aa-login">Login</a>`
  let ConnectedUserId = JSON.parse(localStorage.getItem("connectedUser"))
  if (ConnectedUserId !== undefined && ConnectedUserId !== null ){
    console.log(ConnectedUserId);

    let user = IdChecker("users", ConnectedUserId)
    if (user.role === "user" ) {
      header= ` <a href="index.html" class="aa-LogOut">LogOut</a>
      `
    }
  }
  document.getElementById("logOut").innerHTML = header;
}
function headerDynamic() {
  let header = `
  <div id="navbar" class="navbar-collapse collapse">
  <ul id="top-menu" class="nav navbar-nav navbar-right aa-main-nav">
    <li class="active"><a href="index.html">HOME</a></li>
     <li class="dropdown">
      <a class="dropdown-toggle" data-toggle="dropdown" href="properties.html">PROPERTIES <span class="caret"></span></a>
      <ul class="dropdown-menu" role="menu">                
        <li><a href="properties.html">PROPERTIES</a></li>
        <li><a href="properties-detail.html">PROPERTIES DETAIL</a></li>                                            
      </ul>
    </li>
    <li><a href="gallery.html">GALLERY</a></li>                                         
    <li class="dropdown">
      <a class="dropdown-toggle" data-toggle="dropdown" href="blog-archive.html">BLOG <span class="caret"></span></a>
      <ul class="dropdown-menu" role="menu">                
        <li><a href="blog-archive.html">BLOG</a></li>
        <li><a href="blog-single.html">BLOG DETAILS</a></li>                                            
      </ul>
    </li>
    <li><a href="contact.html">CONTACT</a></li>
  </ul>                            
</div>`
  let ConnectedUserId = JSON.parse(localStorage.getItem("connectedUser"))
  let users = JSON.parse(localStorage.getItem("users"))
  for (let i = 0; i < users.length; i++) {
    
    if (ConnectedUserId ===users[i].id && users[i].role === ("owner" || "admin")  ){
      
  
      
        header= `   <div id="navbar" class="navbar-collapse collapse">
        <ul id="top-menu" class="nav navbar-nav navbar-right aa-main-nav">
          <li class="active"><a href="index.html">HOME</a></li>
           <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="properties.html">PROPERTIES <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">                
              <li><a href="properties.html">PROPERTIES</a></li>
              <li><a href="properties-detail.html">PROPERTIES DETAIL</a></li>                                            
            </ul>
          </li>
          <li><a href="gallery.html">GALLERY</a></li>                                         
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="blog-archive.html">BLOG <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">                
              <li><a href="blog-archive.html">BLOG</a></li>
              <li><a href="blog-single.html">BLOG DETAILS</a></li>                                            
            </ul>
          </li>
          <li><a href="contact.html">CONTACT</a></li>
          <li><a href="users-list.html">Users List</a></li>
         <li><a href="404.html">404 PAGE</a></li>
        </ul>                            
      </div>
        `
      
    }
    
  }
  document.getElementById("headerDynamic").innerHTML = header;
}


function AddHomes() {
  let HomeName = document.getElementById("HomeName").value
  let rooms = document.getElementById("Rooms").value
  let price = document.getElementById("Price").value
  let T = JSON.parse(localStorage.getItem("Homes") || "[]")
  
  let HomeId = JSON.parse(localStorage.getItem("HomeId") || "1")

  let info ={
   name: HomeName,
   rooms:rooms,
   price: price
  }
  info.id = HomeId
  T.push(info)
localStorage.setItem("Homes", JSON.stringify(T))
localStorage.setItem("HomeId", JSON.stringify(HomeId + 1))

}


function ShowHomes(T) {
  let Homes = JSON.parse(localStorage.getItem("Homes") || "[]")

  let home = ``

  for (let i = 0; i < Homes.length; i++) {
    home = home +`
    
    <li>
    <article class="aa-properties-item">
      <a class="aa-properties-item-img" href="#">
        <img alt="img" src="img/item/6.jpg">
        </a>
        <div class="aa-tag for-rent">
        For Rent
        </div>
        <div class="aa-properties-item-content">
        <div class="aa-properties-info">
        <span>${Homes[i].rooms} Rooms</span>
        
        </div>
        <div class="aa-properties-about">
        <h3><a href="#">${Homes[i].name}</a></h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim molestiae vero ducimus quibusdam odit vitae.</p>                      
        </div>
        <div class="aa-properties-detial">
        
        <a class="aa-secondary-btn" onclick="DetailsNavigator("cartItems",${Homes[i].id})" href="properties-detail.html">View Details</a>
        </div>
        </div>
        </article>
        </li>
        
        
        `
        
      }
      document.getElementById("HomeAdder").innerHTML = home
    }

    function DetailsNavigator(key, id) {
      localStorage.setItem(key, id);
      location.replace("properties-details.html");
    }
    
function homeDetails() {
  let Id = LSFinder("cartItems")
  let home = IdChecker("Homes", Id)
  document.getElementById("nameHome").innerHTML = home.name
  document.getElementById("homePrice").innerHTML = home.price

}

function LSFinder(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}


function homeFinder() {
  let finder = document.getElementById("finder").value

  let homes = LSFinder("homes")

  T = []
  if (finder = undefined) {
    T = homes
  } else { 
    for (let i = 0; i < homes.length; i++) {
      if (home[i].name.tolowercase().includes(finder.tolowercase())) {
        T.push(homes[i])
      }
      
    }
  }
ShowHomes(T)
}



function usersList(){
  let usersList = ``;
  let Users = LSFinder("users");
for (let i = 0; i < Users.length; i++) {
  if (Users[i].role !== "owner") {
    usersList = usersList +`
    <tr>
      <th scope="row">${Users[i].id}</th>
      <td>${Users[i].firstName}</td>
      <td>${Users[i].lastName}</td>
      <td>${Users[i].email}</td>
      <td>${Users[i].PhoneNumber}</td>
      <td>${Users[i].Address}</td>
      <td>${Users[i].password}</td>
      <td>${Users[i].role}</td>
      <td>     
      <button type="button" onclick="deleteItem('users',${i})" class="btn btn-danger">
         <i class="fa fa-trash"></i>
      </button>
      </td>
      </tr>  
    
    
    
    `
  }
  
}
document.getElementById("UsersList").innerHTML = usersList

}


function deleteItem(key, pos) {
  let objects = LSFinder(key);
  objects.splice(pos, 1);
  localStorage.setItem(key, JSON.stringify(objects));
  location.reload();
}


