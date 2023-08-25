function onLoad(){
    const inputElement = document.querySelectorAll("input[type='text'], input[type='email']");
    for(let i = 0; i < inputElement.length; i++){
        inputElement[i].addEventListener('change', onChangeHandler)
    }
    showResults();
}
function onSubmit(event){
    event.preventDefault();
    const submitButton = document.getElementById("btn");
    const getButtonValue = submitButton.getAttribute('isUpdate');

    const inputElement = document.querySelectorAll("input[type='text'], input[type='email']");
    const data = {}
    let isValid = true
    for(let i = 0; i < inputElement.length; i++){
        const name = inputElement[i].name;
        const value = inputElement[i].value;
        hasErrorMassage(name, value);
        if(!value){
            isValid = false;
        }
        data[name] = value;
    }
    if(isValid){
        const dataItem = getStoreData();
        if(getButtonValue != 'null'){
            dataItem[getButtonValue] = data;
        }else{
            dataItem.push(data)
        }
        saveRecord(dataItem);
    }
    submitButton.setAttribute("isUpdate", "null");
    submitButton.innerText = 'Register now'
}

function deleteHandler(index){
    if(confirm("Do you want to delete")){
        const dataItem = getStoreData();
        dataItem.splice(index, 1);
        setLocalStorage(dataItem);
        showResults();
    }
}

function editHandler(index){
    const dataItem = getStoreData();
    const item = dataItem[index];
    const inputElement = document.querySelectorAll("input[type='text'], input[type='email']");
    for(let i = 0; i < inputElement.length; i++){
        const name = inputElement[i].name;
        inputElement[i].value = item[name];
    }
    const submitButton = document.getElementById("btn");
    submitButton.setAttribute("isUpdate", index);
    submitButton.innerText = 'Update'
    showResults();
}

function showResults(){
    const response = getStoreData();
    let tableBody = '';
    const getTableBlockElement = document.getElementsByClassName("main-table")[0];
    if(getTableBlockElement){
        if(response.length){
            getTableBlockElement.style.display = 'block';
        }else{
            getTableBlockElement.style.display = 'none';
        }
    }
    
    for(let i = 0; i < response.length; i++){
        const item = response[i];
        tableBody += `
            <tr>
                <td>${i + 1}</td>
                <td>${item.firstName} ${item.lastName}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.streetAddress}</td>
                <td>${item.streetAddressLine2}</td>
                <td>${item.state}</td>
                <td>${item.country}</td>
                <td>${item.postCode}</td>
                <td>${item.areaCode}</td>
                <td>
                    <i class="fa fa-edit" onclick="editHandler(${i})"></i> | 
                    <i class="fa fa-trash" onclick="deleteHandler(${i})"></i>
                </td>
            </tr>
        `
    }
    const tableBodyElement = document.getElementById('tableBody');
    tableBodyElement.innerHTML = tableBody;
}

function saveRecord(data){
    const form = document.getElementById("registrationFrm");
    setLocalStorage(data);
    showResults();
    form.reset();
}

function setLocalStorage(data){
    localStorage.setItem('DATA', JSON.stringify(data));
}

function getStoreData(){
    const store = localStorage.getItem('DATA');
    if(!store){
        return [];
    }
    try{
        const data = JSON.parse(store);
        if(Array.isArray(data)){
            return data;
        }
        return [];
    }catch{
        return [];
    }
}

function onChangeHandler(event){
    const name = event.target.name;
    const value = event.target.value;
    hasErrorMassage(name, value);
}

function hasErrorMassage(name, value){
    const errorElement = document.getElementsByClassName(`error-${name}`)[0];
    if(errorElement){
        if(value){
            errorElement.style.display = 'none';
        }else{
            errorElement.style.display = 'block';
        }
    }
}
