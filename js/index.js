var siteName = document.getElementById("name");
var siteUrl = document.getElementById("url");

var bookmarks = [];
if (localStorage.getItem("bookmark") != null) {
  bookmarks = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmarks();
}

function addBookmark() {
  var bookmark = {
    name: siteName.value,
    url: siteUrl.value,
  };
  if (validateForm() == true) {
    bookmarks.push(bookmark);
    console.log("working");
    displayBookmarks();
    clearData();
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
  } else {
    validateForm();
  }
}

function displayBookmarks() {
  var box = "";
  for (var i = 0; i < bookmarks.length; i++) {
    box += `<tr>
    <td>${i + 1}</td>
    <td>${bookmarks[i].name}</td>
    <td><button class="btn btn-outline-warning" onclick="visitSite(${i})">visit</button>
    </td>
    <td><button class="btn btn-outline-danger" onclick="deleteSite(${i})">Delete</button></td>
    <td><button class="btn btn-outline-primary" onclick="updateSite(${i})">Update</button></td>
  </tr>`;
  }
  document.getElementById("tbody").innerHTML = box;
}
function clearData() {
  siteName.value = "";
  siteUrl.value = "";
}
function deleteSite(idx) {
  bookmarks.splice(idx, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarks));
  displayBookmarks();
}
function visitSite(idx) {
  open(bookmarks[idx].url);
}

function updateSite(idx) {
  siteName.value = bookmarks[idx].name;
  siteUrl.value = bookmarks[idx].url;
  document.getElementById("add").outerHTML = `
    <button
            type="button"
            class="btn btn-outline-info rounded-pill m-auto mb-5"
            onclick="change(${idx})"
            id="update">
           Update Bookmark
          </button>`;
}

function change(idx) {
  bookmarks[idx].name = siteName.value;
  bookmarks[idx].url = siteUrl.value;
  if (validateForm() == true) {
    document.getElementById("update").outerHTML = `<button
    type="button"
    class="btn btn-outline-info rounded-pill m-auto mb-5"
    onclick="addBookmark()"
    id="add"
  >
    Add Bookmark
  </button>`;
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
    displayBookmarks();
    clearData();
  } else {
    validateForm();
  }
}

function searchBookmark(word) {
  var box = "";
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name.toLowerCase().includes(word.toLowerCase()) == true) {
      box += `<tr>
         <td>${i + 1}</td>
         <td>${bookmarks[i].name}</td>
         <td><button class="btn btn-outline-warning" onclick="visitSite(${i})">visit</button>
         </td>
         <td><button class="btn btn-outline-danger" onclick="deleteSite(${i})">Delete</button></td>
         <td><button class="btn btn-outline-primary" onclick="updateSite(${i})">Update</button></td>
       </tr>`;
    }
  }
  document.getElementById("tbody").innerHTML = box;
}

function validateForm() {
  var urlRegex = /^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)/gi;
  var nameRegex = /^\w{3,}(\s+\w+)*$/gi;
  if (nameRegex.test(siteName.value) == false) {
    return Swal.fire({
      icon: "error",
      title: " Name is not valid",
      html: '<h6> <i class="fa-solid fa-circle-exclamation mx-2 blue-color"></i>Site name must contain at least 3 characters</h6>',
    });
  }
  if (urlRegex.test(siteUrl.value) == false) {
    return Swal.fire({
      icon: "error",
      title: "Url is not valid",
      html: '<h6> <i class="fa-solid fa-circle-exclamation blue-color mx-2"></i>Site URL must be a valid one </h6>',
    });
  }
  if (siteName.value == "" && siteUrl.value == "") {
    return Swal.fire({
      icon: "error",
      title: " Please Enter name and URL",
    });
  }
  return true;
}
