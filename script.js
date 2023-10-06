
// blogal variables  initialazation
  let title = document.getElementById('title');  
  let price = document.getElementById('price'); 
  let taxes = document.getElementById('taxes'); 
  let ads = document.getElementById('ads'); 
  let discount = document.getElementById('discount'); 
  let total = document.getElementById('total'); 
  let count = document.getElementById('count'); 
  let category = document.getElementById('category'); 
  let submit = document.getElementById('submit'); 
  let tmp;
  let mood='create';



 // get total function
   function getTotal()
   {
     if(price.value != '' )
     {
        let result = (+price.value + +taxes.value + +ads.value)
        - +discount.value;
        
        total.innerHTML = result;
        total.style.background = '#040';
     }
     else
     {
          total.innerHTML = '';
          total.style.background = '#a00d02';
     }
   }
 
 // save localstorge
    
    let dataProduct = JSON.parse(localStorage.getItem('product')) || [];
    if(localStorage.product != null)
    {
        dataProduct= JSON.parse(localStorage.product);
    } else{
        dataProduct=[];
    }
 // create product function
  submit.onclick = function createProduct(){
    let newProduct ={
        title: title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if(mood === 'create'){if (newProduct.count > 1 )
     {
           for ( let i = 0; i < newProduct.count; i++){
            dataProduct.push(newProduct);
           }
     }else{dataProduct.push(newProduct);}
    }else{dataProduct[tmp]=newProduct;
      mood='create';
      count.style.display='block';
      submit.innerHTML='CREATE';
    
    }
     
    
    
    localStorage.setItem('product', JSON.stringify(dataProduct));
      console.log(dataProduct);
      // oprate function with button create(submit)
      ClearData();
      ReadData();
      
  }
  
 // clear inputs function
 function ClearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
    

 }

 // read product
  ReadData();
  function ReadData(){
    getTotal();
    let table ='';
    for(let i=0;i< dataProduct.length;i++){
        table += `<tr>
        <td>${i} </td>
        <td>${dataProduct[i].title} </td>
        <td>${dataProduct[i].price} </td>
        <td>${dataProduct[i].taxes} </td>
        <td>${dataProduct[i].ads} </td>
        <td>${dataProduct[i].discount} </td>
        <td>${dataProduct[i].total} </td>
        <td>${dataProduct[i].category} </td>
        <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
        <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
        
        </tr> `  
    }
    document.getElementById('tbody').innerHTML=table;
      let btnDelete = document.getElementById('deleteall');
    if(dataProduct.length > 0)
    {
      btnDelete.innerHTML =`<button onclick="deleteAll()">DELETE ALL (${dataProduct.length})</button>`

    }
    else{
      btnDelete.innerHTML='';
    }

  }
  
  
 // delete product
 function deleteData(i)
 {
       dataProduct.splice(i,1);
        localStorage.product = JSON.stringify(dataProduct);
        ReadData();
  }

  // delete all product
  function deleteAll()
  {
    localStorage.clear();
    dataProduct.splice(0);
    ReadData();
  }
 // update product
 function updateData(i){
  title.value= dataProduct[i].title;
  price.value= dataProduct[i].price;
  taxes.value= dataProduct[i].taxes;
  ads.value= dataProduct[i].ads;
  discount.value= dataProduct[i].discount;
  getTotal();
  category.value= dataProduct[i].category;
  count.style.display='none';
  submit.innerHTML='UPDATE';
  ReadData();
  mood='update';
  tmp=i;
  scroll({
    top:0,
    behavior:'smooth',
  })

 }
 // search product
 let searchMod = 'title';
 let search = document.getElementById('search');
 function getSearchMod(id)
 {
  if(id == 'searchTitle'){
    searchMod='title';
    search.placeholder= 'Search By Title';
  }else{
    searchMod='category';
    search.placeholder='Search By Category';
  }
  search.focus();
  search.value='';
  ReadData();
 }
 function searchData(value){
  let table='';
  if(searchMod == 'title'){
      for(let i=0;i< dataProduct.length;i++){
        if(dataProduct[i].title.includes(value.toLowerCase())){
          table += `<tr>
          <td>${i}</td>
          <td>${dataProduct[i].title} </td>
          <td>${dataProduct[i].price} </td>
          <td>${dataProduct[i].taxes} </td>
          <td>${dataProduct[i].ads} </td>
          <td>${dataProduct[i].discount} </td>
          <td>${dataProduct[i].total} </td>
          <td>${dataProduct[i].category} </td>
          <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
          <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
          
          </tr> ` 
        }

      }

  }else{
    for(let i=0;i< dataProduct.length;i++){
      if(dataProduct[i].category.includes(value.toLowerCase())){
        table += `<tr>
        <td>${i}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">UPDATE</button></td>
        <td><button onclick="deleteData(${i})" id="delete">DELETE</button></td>
        
        </tr> ` 
      }

    }

  }
  document.getElementById('tbody').innerHTML=table;
 }

 





