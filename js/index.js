var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var productList;
var mainBtn = document.getElementById("mainBtn");
var currentIndex = 0;

if(localStorage.getItem("listitem") != null){
  productList= JSON.parse(localStorage.getItem("listitem"));
  console.log(productList);
  displayProduct(productList);
}
else{
    productList=[];
}

function addProduct(){
    if(mainBtn.innerText == "Update"){
        updateProduct();
    }else{
        if(validateProductName() && validateProductPrice() && validateProductCat() && validateProductDesc()){
    var product ={
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        desc: productDesc.value,
    }
    clearForm();
    productList.push(product);
    setToLocalStorage();
    displayProduct(productList);
    console.log(productList);
}else{
    alert('invalid')
}
}
}
function displayProduct(listitem){
    var cartona =``;
    for(var i=0; i<listitem.length;i++){
        cartona +=` <tr>
        <td> ${i+1}</td>
        <td> ${listitem[i].newName?listitem[i].newName : listitem[i].name} </td>
        <td> ${listitem[i].price} </td>
        <td> ${listitem[i].category}</td>
        <td> ${listitem[i].desc}</td>
        <td>
            <button class="btn btn-warning" onclick="getProductData(${i})">Update</button>
        </td>
        <td>
            <button class="btn btn-danger"onclick="deleteProduct(${i})">Delete</button>
        </td>
    </tr>`;
  }
  document.getElementById('tableData').innerHTML=cartona;
}

function clearForm(flag){
    productName.value=flag? flag.name : '';
    productPrice.value=flag? flag.price : '';
    productCat.value=flag? flag.category : '';
    productDesc.value=flag? flag.desc : '';
}

function deleteProduct(index){
    productList.splice(index,1);
    displayProduct(productList);
    setToLocalStorage();
}

function setToLocalStorage(){
    localStorage.setItem("listitem",JSON.stringify(productList));
}

function getProductData(index){
    currentIndex = index;
   clearForm(productList[index])
    mainBtn.innerText = "Update"
}
function updateProduct(){
    var product ={
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        desc: productDesc.value,
    }
    productList[currentIndex] = product;
    clearForm();
    mainBtn.innerText = "Add product";
    displayProduct(productList);
    setToLocalStorage();
}
function search(searchKey){
    var searchList=[];
    for (var i=0; i<productList.length; i++){
       if( productList[i].name.toLowerCase().includes(searchKey.toLowerCase())){
        productList[i].newName = productList[i].name.replace(searchKey,`<span class="text-danger fw-bolder fs-6">${searchKey}</span>`)
        searchList.push(productList[i]);
       }
    }
    console.log(searchList)
    displayProduct(searchList);
}

function validateProductName(){
    var regex = /^[A-Z][a-z]{3,8}$/;
    if(regex.test(productName.value)){
        document.getElementById("name-validation").classList.replace("d-block","d-none");
        return true
    }else{
        document.getElementById("name-validation").classList.replace("d-none","d-block");
        return false
    }
}

function validateProductPrice(){
    var regex = /^([1-9][0-9]{3}|10000)$/;
    if(regex.test(productPrice.value)){
        document.getElementById("price-validation").classList.replace("d-block","d-none");
        return true
    }else{
        document.getElementById("price-validation").classList.replace("d-none","d-block");
        return false
    }
}

function validateProductCat(){
    var regex = /^TV|Mobile|Device$/gi;
    if(regex.test(productCat.value)){
        document.getElementById("cat-validation").classList.replace("d-block","d-none");
        return true
    }else{
        document.getElementById("cat-validation").classList.replace("d-none","d-block");
        return false
    }
}

function validateProductDesc(){
    var regex = /^.{1,500}$/;
    if(regex.test(productDesc.value)){
        document.getElementById("Desc-validation").classList.replace("d-block","d-none");
        return true
    }else{
        document.getElementById("Desc-validation").classList.replace("d-none","d-block");
        return false
    }
}

