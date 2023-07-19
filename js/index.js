
var siteName= document.getElementById('name');
var siteUrl=document.getElementById('url');
var urlRegex=/^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)/;
var nameRegex= /^\w{3,}(\s+\w+)*$/;


var bookmarks=[];
if(localStorage.getItem("bookmark") != null){
  bookmarks=JSON.parse(localStorage.getItem("bookmark"));
  displayBookmarks();
}


function addBookmark(){
    var bookmark={
        name:siteName.value,
        url:siteUrl.value
    };


    if(siteName.value != ""){
        if( urlRegex.test(siteUrl.value)== true && nameRegex.test(siteName.value)==true){
    bookmarks.push(bookmark);
    console.log("working");
    displayBookmarks();
    clearData();
    localStorage.setItem("bookmark" , JSON.stringify(bookmarks));
    
    }
else{
    console.log("Url is not valid");
    Swal.fire({
        icon: 'error',
        title: ' Name or Url is not valid',
        html: '<h6> <i class="fa-solid fa-circle-exclamation mx-2 blue-color"></i>Site name must contain at least 3 characters</h6><h6> <i class="fa-solid fa-circle-exclamation blue-color mx-2"></i>Site URL must be a valid one </h6>',
        
        

        
      });
}}else{
    Swal.fire({
        icon: 'error',
        title: ' Please Enter name and URL',
    })

}


}


function displayBookmarks(){
    
    var box="";
    for(var i=0 ; i< bookmarks.length; i++){
  box+=
    `<tr>
    <td>${i+1}</td>
    <td>${bookmarks[i].name}</td>
    <td><button class="btn btn-outline-warning" onclick="visitSite(${i})">visit</button>
    </td>
    <td><button class="btn btn-outline-danger" onclick="deleteSite(${i})">Delete</button></td>
    <td><button class="btn btn-outline-primary" onclick="updateSite(${i})">Update</button></td>
  </tr>`;

    }
    document.getElementById('tbody').innerHTML= box;

    
}
function clearData(){
    siteName.value='';
    siteUrl.value='';
}
function deleteSite(idx){
    bookmarks.splice(idx,1);
    localStorage.setItem("bookmark", JSON.stringify(bookmarks));
    displayBookmarks();
}
function visitSite(idx){
    open(bookmarks[idx].url);


}


function updateSite(idx){
    siteName.value=bookmarks[idx].name;
    siteUrl.value=bookmarks[idx].url;
    document.getElementById('add').outerHTML=
    `
    <button
            type="button"
            class="btn btn-outline-info rounded-pill m-auto mb-5"
            onclick="change(${idx})"
            id="update">
           Update Bookmark
          </button>`;
          
    

}


function change(idx){
    bookmarks[idx].name=siteName.value;
    bookmarks[idx].url=siteUrl.value;
    document.getElementById('update').outerHTML=`<button
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

}


function searchBookmark(word){
    var box="";
    for(var i=0 ; i< bookmarks.length ; i++){
        if(bookmarks[i].name.toLowerCase().includes(word.toLowerCase()) == true){  
         box+=
         `<tr>
         <td>${i+1}</td>
         <td>${bookmarks[i].name}</td>
         <td><button class="btn btn-outline-warning" onclick="visitSite(${i})">visit</button>
         </td>
         <td><button class="btn btn-outline-danger" onclick="deleteSite(${i})">Delete</button></td>
         <td><button class="btn btn-outline-primary" onclick="updateSite(${i})">Update</button></td>
       </tr>`;
        }
    }
    document.getElementById("tbody").innerHTML= box;
   
}