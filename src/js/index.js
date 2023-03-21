const consultInput = document.querySelectorAll('input');
const confirmButton = document.querySelector('.confirm');
const inputsContainer = document.querySelector('.contInp');
const confirmContainer = document.querySelector('.complete');
const consultError = document.querySelectorAll('.error')
const zero = '0'
var error = false

consultInput.forEach((input, index) => {
    input.addEventListener('input', () => {

        const spanSelected = document.querySelector('.span'+ input.id);
        let errorSelected = consultError[index]
        errorSelected.textContent = ''

        switch (input.id){
            case 'Name':
                nameCard(input, spanSelected, errorSelected);
            break;

            case 'Number':
                numberCard(input, spanSelected, errorSelected);
            break;

            case 'Month':
                monthCard(input, spanSelected, errorSelected);
            break;

            case 'Year':
                yearCard(input, spanSelected, errorSelected);
            break;

            case 'Cvc':
                cvcCard(input, spanSelected, errorSelected);
            break; 
        }

        if (errorSelected.textContent != ''){
            input.classList.add('errorBorder')
        }else input.classList.remove('errorBorder')

    } )

})

confirmButton.addEventListener('click', () => {

    if(confirmButton.textContent == 'Continue') document.location.reload(true);

    for (let index=0; index < consultInput.length; index++) {
        if(consultInput[index].value == '' || consultError[index].textContent != ''){
            error = false;
            break;
        }else{
            error = true;
        }
    }   

    if (error){
        inputsContainer.classList.toggle("hide");
        confirmContainer.classList.toggle("hide");

        confirmButton.textContent = 'Continue'
        
    }


})


function nameCard(input, spanSelected, errorSelected) {
    let editedName = input.value.replace(/[\d]/g, "");

    spanSelected.textContent = editedName;
    input.value = spanSelected.textContent;

    if (input.value == '') errorSelected.textContent = 'Can`t be blank'
}

function numberCard(input, spanSelected, errorSelected) {
    let editedNumber = input.value.replace(/[\D]/g, "");

    input.value = editedNumber
    editedNumber = editedNumber + zero.repeat(16-input.value.length);

    editedNumber = editedNumber.match(/\d{1,4}/g);
    if (editedNumber !== null)
        editedNumber = editedNumber.join(" ");

    spanSelected.textContent = editedNumber;
    
    if (input.value.length < 16) 
        errorSelected.textContent = 'Must have 16 numbers'

    if (input.value == ''){
        spanSelected.textContent = '0000 0000 0000 0000';
        errorSelected.textContent = 'Can`t be blank'
    }

}

function monthCard(input, spanSelected, errorSelected) {
    let editedMonth = input.value.replace(/[\D]/g, "");
    editedMonth = editedMonth.substring(0, 2);

    spanSelected.textContent = editedMonth;
    input.value = spanSelected.textContent;
    
    if(input.value.length < 2) 
        spanSelected.textContent = '0' + input.value

    if(input.value > 12 || input.value == 0)
        errorSelected.textContent = 'Invalid month'

    if (input.value == ''){
        spanSelected.textContent = '00';
        errorSelected.textContent = 'Can`t be blank'
    }

}

function yearCard(input, spanSelected, errorSelected) {
    let editedYear = input.value.replace(/[\D]/g, "");
    editedYear = editedYear.substring(0, 2);

    spanSelected.textContent = editedYear;
    input.value = spanSelected.textContent;

    if(input.value.length < 2) 
        spanSelected.textContent = '0' + input.value

    if (input.value == ''){
        spanSelected.textContent = '00';
        errorSelected.textContent = 'Can`t be blank'
    }
}

function cvcCard(input, spanSelected, errorSelected) {
    let editedCvc = input.value.replace(/[\D]/g, "");

    input.value = editedCvc
    
    editedCvc = zero.repeat(3-editedCvc.length) + editedCvc

    spanSelected.textContent = editedCvc;

    if (input.value == ''){
        spanSelected.textContent = '000';
        errorSelected.textContent = 'Can`t be blank'
    }
}
