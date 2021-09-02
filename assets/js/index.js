const baseUrl = "http://localhost3000";
function showRegisterPage() {
  $("#register-page").show();
  $("#home-page").hide();
  $("#login-page").hide();
  $("#app").hide();
}

// function showAppPage() {
//   $("#app").show();
//   $("#home-page").hide();
//   $("#register-page").hide();
//   $("#login-page").hide();
// }

function showLoginPage() {
  $("#login-page").show();
  $("#home-page").hide();
  $("#register-page").hide();
  $("#app").hide();
}

function checkToken() {
  if (localStorage.getItem("access_token")) {
    $("#app").show();
    $("#home-page").hide();
    $("#register-page").hide();
    $("#login-page").hide();
    fetchData();
  } else {
    showLoginPage();
  }
}

function register() {
  showRegisterPage();

  $("#register-from").submit(function (e) {
    e.preventDefault();

    const email = $("#email-register").val();
    const password = $("#password-register").val();

    console.log(email);

    $.ajax(`${baseUrl}/users/register`, {
      method: "POST",
      data: {
        email,
        password,
      },
    })
      .done(function (response) {
        checkToken();
      })
      .fail(function (error) {
        console.log(error.responseJSON);
      });
  });
}

// function onSignIn(googleUser) {
//   let id_token = googleUser.getAuthResponse().id_token;
//   $.ajax(`${baseUrl}/authGoogle`, {
//     method: "POST",
//     data: {
//       idToken: id_token,
//     },
//   });
// }

function fetchData() {
  $.ajax(`${baseUrl}/movies`, {
    method: "get",
    headers: {
      access_token: localStorage.getItem("access_token"),
    },
  })
    .done(function (response) {
      console.log(response);
    })
    .fail(function (error) {
      console.log(error.responseJSON);
    });
}

// function fetchData() {
//   $.ajax(`${baseUrl}/movies`, {
//     method: "get",
//     headers: {
//       access_token: localStorage.getItem("access_token"),
//     },
//   }).done(function (response) {
//     $("#value-table").empty();
//     response.forEach((el) => {
//       $("#value-table").append(
//         <tr>
//           <td>${el.title}</td>
//           <td>${el.trailerUrl}</td>
//           <td>${el.imgUrl}</td>
//           <td>${el.rating}</td>
//           <td>
//             <button
//               onclick="deleteMovie(${el.id})"
//               type="button"
//               class="btn btn-success"
//             >
//               delete
//             </button>
//             <button type="button" class="btn btn-warning">
//               edit
//             </button>
//           </td>
//         </tr>
//       );
//     });
//   });
// }

function login() {
  $("#login-from").submit(function (e) {
    e.preventDefault();
    const email = $("#email-login").val();
    const password = $("#password-login").val();

    console.log(email, password);

    // $.ajax(`${baseUrl}/users/login`, {
    //   method: "POST",
    //   data: {
    //     email,
    //     password,
    //   },
    // })
    //   .done(function (response) {
    //     localStorage.getItem("access_token", response.access_token);
    //   })
    //   .fail(function (error) {
    //     console.log(error.responseJSON);
    //   });
  });
}

$(document).ready(function () {
  checkToken();
});
