
let menuBooks = document.getElementById('booksSelect');
let countInput = document.getElementById('count');
let booksCost = document.getElementById('booksCost');

let post = document.getElementById('post');
let toHome = document.getElementById('toHome');
let packing = document.getElementById('packing');

let calcBill = document.getElementById('calcBill');
let bill = document.getElementById('bill');

let Name = document.getElementById('name');
let adress = document.getElementById('adress');

let reset = document.getElementById('reset');
let send = document.getElementById('send');
let table = document.getElementById('orders');

let deliveryMethod = '';
let isPacking = '';
let singlePrice;

function required(){
    if(menuBooks.selectedIndex != 0 && countInput.value > 0 && booksCost.value != '' &&
        (post.checked || toHome.checked) && bill.value != '' && 
        Name.value != '' && adress.value != ''){
            return true;
    }
    else {
        alert("Please, fill in all fields!");
    }
}
function checkBook(){
    menuBooks.addEventListener('change', function(e){
        e.preventDefault();
        singlePrice = Number(this[this.selectedIndex].dataset.price);
        //console.log(singlePrice);
        countInput.value = 1;
        booksCost.value = singlePrice;
    });
}

function checkCount(){
    countInput.oninput = function(){
        let count = Number(countInput.value);
        let wholeCost = count * singlePrice;
        booksCost.value = wholeCost;
    }
}
let getBill = function(){
    let finalBill = Number(booksCost.value);
    let deliveryPrice = 0;
    let pack = 0;
    if(post.checked){
        deliveryMethod = post.value;
        console.log(post.value);
        deliveryPrice  = finalBill*0.05;
    }
    if(toHome.checked){
        deliveryMethod = toHome.value;
        deliveryPrice  = finalBill*0.15;
    }
    if(packing.checked){
        isPacking = "(" + packing.value + ")";
        pack = deliveryPrice *0.10;
    }
    finalBill += deliveryPrice  + pack;
    return finalBill;
}
let CalcBill = function(){
    calcBill.onclick = function(e){
        e.preventDefault();
        bill.value = getBill();
    }
}

let resetFields = function(){
    reset.onclick = function(e){
        e.preventDefault();
        menuBooks.selectedIndex = 0;
        countInput.value = 0;
        booksCost.value = bill.value = Name.value = adress.value = '';
        post.checked = toHome.checked = packing.checked = false;
    }
}
let sendOrder = function(){
    send.onclick = function(e){
        e.preventDefault();
        let goodInfo = required();
        if(goodInfo == true){
            let newRow = table.insertRow(-1);

            let bookName = newRow.insertCell(0);
            let count = newRow.insertCell(1);
            let del = newRow.insertCell(2);
            let BILL = newRow.insertCell(3);
            let infoUser = newRow.insertCell(4);
            let submit_cancel = newRow.insertCell(5);
            
            bookName.innerHTML = menuBooks[menuBooks.selectedIndex].innerText;
            count.innerHTML = countInput.value;
            del.innerHTML = deliveryMethod + "<span>" + isPacking + "</span>";
            BILL.innerHTML = bill.value;
            infoUser.innerHTML =   "<p>Name: " + Name.value + "</p><p>Adress: " + adress.value + "</p>";
            submit_cancel.innerHTML = "<p><input type='submit' id='yes' value='Submit'></p>"+
            "<p><input type='submit' id='no' value='Cancel'></p>"
            table.classList.add('active');
        }
    }
}
let submit_cancel_check = function(){
    let yes = document.getElementById('yes');
    table.onclick = function(e){
        e.preventDefault();
        let parent = e.target.parentNode;
        if(e.target.id == 'yes') {
            parent.parentNode.innerHTML = "<p class='success'>Created!</p>";
        }
        if(e.target.id == 'no'){
            let td = parent.parentNode;
            let tr = td.parentNode;
            tr.parentNode.removeChild(tr);
        }
       
    }
}
let setCost = function(){
    checkBook();
    checkCount();
    CalcBill();
    resetFields();
    sendOrder();
    submit_cancel_check();
}
window.onload = function(){
    setCost();
}
