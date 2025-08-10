
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
// console.log(title, price, taxes, ads, discount, total, count, category, submit);

let mood = 'create';
let tmp;

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value) + (+taxes.value) + (+ads.value) - (+discount.value);
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = ' ';
        total.style.background = '#a00d02';
    }
}

// create product
let dataPro;
if (localStorage.products != null) {
    dataPro = JSON.parse(localStorage.getItem('products'));
}
else {
    dataPro = [];
}
submit.onclick = function () {
    let newObj = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '' && category.value != '' && newObj.count < 100) {
        if (mood == 'create') {
            if (newObj.count > 1) {

                // count
                for (let i = 0; i < newObj.count; i++) {
                    dataPro.push(newObj);
                }
            }
            else {
                dataPro.push(newObj);
            }
        }
        else {
            dataPro[tmp] = newObj;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }

    // save localstorage
    localStorage.setItem('products', JSON.stringify(dataPro));
    console.log(dataPro);
    showData();
}

// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
                    <td><button id="dalate" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>
                `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('daleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    }
    else {
        btnDelete.innerHTML = '';
    }
}
showData();

// delete
function deleteProduct(index) {
    // console.log(index);
    dataPro.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(dataPro));
    showData();
}

// delete all
function deleteAll() {
    localStorage.removeItem('products'); // localStorage.clear();
    dataPro = []; // dataPro.splice(0); 
    showData();
}

// update 
function updateProduct(index) {
    // console.log(index);
    title.value = dataPro[index].title;
    price.value = dataPro[index].price;
    taxes.value = dataPro[index].taxes;
    ads.value = dataPro[index].ads;
    discount.value = dataPro[index].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[index].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = index;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

// search 
let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    }
    else {
        searchMood = 'category';
    }
    search.placeholder = `Search by ${searchMood}`;
    search.focus();
    search.value = '';
    showData();
}

// search
let table = ''; // Global declaration remains outside
function searchData(value) {
    table = ''; // Reset table at the start of each search
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
                                <td><button id="dalate" onclick="deleteProduct(${i})">Delete</button></td>
                            </tr>
                            `;
            }
        }

        else {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                            <tr>
                                <td>${i + 1}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
                                <td><button id="dalate" onclick="deleteProduct(${i})">Delete</button></td>
                            </tr>
                            `;
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
}