function Slider() {
    const container = document.getElementById('slider')
    const btnPrev = document.getElementById('btn-prev')
    const btnNext = document.getElementById('btn-next')
    const length = document.querySelectorAll('.slider_item').length
    const btnControl = document.querySelectorAll('.slider_item-control')

    let index = 1,lastindex = 1;

    function handleClick(isNext) {
        container.style.transition = 'transform 0.5s ease-out'
        if (isNext){
            index++
        }
        else{
            index--
        }
        container.style.transform = `translateX(${-1*index*container.clientWidth}px)`
        if (btnControl[lastindex-1]){
            btnControl[lastindex-1].classList.remove('active')
        }
        if (btnControl[index-1]){
            btnControl[index-1].classList.add('active')
        }
        lastindex=index
    }

    btnPrev.onclick = function (e) {
        handleClick(false)
    }

    btnNext.onclick = function (e) {
       handleClick(true)
    }

    container.addEventListener('transitionrun',(e) => {
        btnPrev.onclick = null
        btnNext.onclick = null
    })

    container.addEventListener('transitionend',() => {
        if (index<=0){
            container.style.transition = 'none'
            index = length-2
            container.style.transform = `translateX(${-1*index*container.clientWidth}px)`
            if (btnControl[lastindex-1]){
                btnControl[lastindex-1].classList.remove('active')
            }
            if (btnControl[index-1]){
                btnControl[index-1].classList.add('active')
            }
            lastindex=index
        }
        else if (index >= length-1){
            container.style.transition = 'none'
            index = 1
            container.style.transform = `translateX(${-1*index*container.clientWidth}px)`
            if (btnControl[lastindex-1]){
                btnControl[lastindex-1].classList.remove('active')
            }
            if (btnControl[index-1]){
                btnControl[index-1].classList.add('active')
            }
            lastindex=index
        }
        btnNext.onclick = function (e) {
            handleClick(true)
        }

        btnPrev.onclick = function (e) {
            handleClick(false)
        }
       
    })

    btnControl.forEach((e,i) => {
        e.onclick = function (e) {
            container.style.transition = 'transform 0.5s ease-out'
            index=i+1
            container.style.transform = `translateX(-${index*container.clientWidth}px)`
            btnControl[lastindex-1].classList.remove('active')
            btnControl[index-1].classList.add('active')
            lastindex=index
        }
    })

    setInterval(() => {
        handleClick(true)
    }, 5000);
}

function showFilm() {
    const btnCurrent = document.getElementById('current-film-btn')
    const btnCommingUp = document.getElementById('coming-up-film-btn')
    const containers = document.querySelectorAll('.film.section_content')
    const headers = document.querySelectorAll('.section_header-title')

    btnCurrent.onclick = function (e) {
        e.preventDefault()
        if (!containers[0].classList.contains('active')){
            containers[0].classList.add('active')
            containers[1].classList.remove('active')
            headers[0].classList.add('active')
            headers[1].classList.remove('active')
        }
    }

    btnCommingUp.onclick = function (e) {
        if (!containers[1].classList.contains('active')){
            containers[1].classList.add('active')
            containers[0].classList.remove('active')
            headers[1].classList.add('active')
            headers[0].classList.remove('active')
        }
    }
}

function showUser() {
    const container = document.getElementById('user')
    const dropDown = document.querySelector('.user-option')

    container.onclick = function (e) {

        dropDown.classList.toggle('open')
    }
}

function Model() {
    const btnShowModel = document.getElementById('btn-showModel')
    const model = document.querySelector('.model')
    const btnClose = document.getElementById('btn-close')
    const form = document.querySelector('.model_body')
    const headerBtns = document.querySelectorAll('.model_heading')
    const formContents = document.querySelectorAll('.form')
    const linkForgot = document.querySelector('.model_login-forgot-pass')
    const modelForgot = document.querySelector('.model_forgot-password')

    btnShowModel.onclick = function (e) {
        if (!model.classList.contains('model-open')){
            model.classList.add('model-open')
        }
        if (!form.classList.contains('active')){
            form.style.display = 'block'
            form.classList.add('active')
        }
    }

    btnClose.onclick = function (e) {
        if (form.classList.contains('active')){
            form.classList.remove('active')
        }
        if (model.classList.contains('model-open')){
            model.classList.remove('model-open')
        }
        if (modelForgot.classList.contains('open')){
            modelForgot.classList.remove('open')
        }
    }

    model.onclick = function (e) {
        if (form.classList.contains('active')){
            form.classList.remove('active')
        }
        if (model.classList.contains('model-open')){
            model.classList.remove('model-open')
        }
        if (modelForgot.classList.contains('open')){
            modelForgot.classList.remove('open')
        }
    }

    form.onclick = function (e) {
        e.stopPropagation()
    }

    let lastindex = 0

    headerBtns.forEach((elem,i) => {
        elem.onclick = function (e) {
            if (!this.classList.contains('active')){
                this.classList.add('active')
                formContents[i].classList.add('form-display')
            }
            headerBtns[lastindex].classList.remove('active')
            formContents[lastindex].classList.remove('form-display')
            lastindex = i
        }
    })

    linkForgot.onclick = function (e) {
        if (!modelForgot.classList.contains('open')){
            form.classList.remove('active')
            setTimeout(() => {
                form.style.display = 'none'
            }, 400);
            setTimeout(() => {
                modelForgot.classList.add('open')
                modelForgot.classList.add('active')
            }, 600);
           
        }
    }

    modelForgot.onclick = function (e) {
        e.stopPropagation()
        if (e.target.id === 'btn-close'){
            if (form.classList.contains('active')){
                form.classList.remove('active')
            }
            if (model.classList.contains('model-open')){
                model.classList.remove('model-open')
            }
            if (modelForgot.classList.contains('open')){
                modelForgot.classList.remove('open')
            }
        }
    }
}

function Validate() {
    const inputEmail = document.querySelector('.model_register-email')
    const inputPass = document.querySelector('.model_register-password')
    const inputReEnterPass = document.querySelector('.model_register-repassword')
    const btnRegister = document.getElementById('btn-register')
    const form = document.querySelector('.form-register')
    const inputSex = document.querySelector('.model_register-sex')
    let alertMess = form.querySelector('.model_aleart')

    btnRegister.onclick = function (e) {
        let isValid = true
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(inputEmail.value)){
            if (!alertMess){
                alertMess = document.createElement('p')
                alertMess.classList.add('model_aleart')
                alertMess.classList.add('model_aleart--error')
                form.insertBefore(alertMess,form.firstChild)
            }
            alertMess.innerHTML = `Email không hợp lệ`
            isValid = false
        }
        else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(inputPass.value)){
            if (!alertMess){
                alertMess = document.createElement('p')
                alertMess.classList.add('model_aleart')
                alertMess.classList.add('model_aleart--error')
                form.insertBefore(alertMess,form.firstChild)
            }
            alertMess.innerHTML = `Mật khẩu ít nhất 8 ký tự bao gồm số,chữ hoa và chữ thường`
            isValid = false
        }
        else if (inputPass.value !== inputReEnterPass.value){
            if (!alertMess){
                alertMess = document.createElement('p')
                alertMess.classList.add('model_aleart')
                alertMess.classList.add('model_aleart--error')
                form.insertBefore(alertMess,form.firstChild)
            }
            alertMess.innerHTML = `Hai mật khẩu không khớp nhau`
            isValid = false
        }
        else if (inputSex.value === ""){
            if (!alertMess){
                alertMess = document.createElement('p')
                alertMess.classList.add('model_aleart')
                alertMess.classList.add('model_aleart--error')
                form.insertBefore(alertMess,form.firstChild)
            }
            alertMess.innerHTML = `Vui lòng chọn giới tính`
            isValid = false
        }
        if (!isValid){
            e.preventDefault()
        }
    }
}

function showNav() {
    const btnMenu = document.getElementById('btn-menu')
    const nav = document.querySelector('.header-nav')

    btnMenu.onclick = function (e) {
        nav.classList.toggle('open')
    }
}

Slider()
showFilm()
showUser()
Model()
Validate()
showNav()