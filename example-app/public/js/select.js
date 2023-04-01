let result = document.querySelector('.result')
var list = document.querySelector('.list')
var input = list.querySelector('input')
var ul = list.querySelector('ul')
let li = ul.querySelectorAll('li')
let num = 20
result.addEventListener('click', function (){
    ul.scrollTop = 0
    list.classList.toggle('active_select')
    document.querySelector('.main_select').querySelector('.arrow').classList.toggle('active_arrow')
    zeroingList()
})
window.onclick = function(e) {
    if (e.composedPath().includes(input) === false) {
        if ((e.composedPath().includes(result) === false) ) {
            ul.scrollTop = 0
            list.classList.remove('active_select')
            document.querySelector('.main_select').querySelector('.arrow').classList.remove('active_arrow')
        }
    }
}
ul.onclick = function (e){
    let item = e.target
    if (document.querySelector('.active_select_li') != null){
        document.querySelector('.active_select_li').classList.remove('active_select_li')
    }
    if (e.target.classList.contains('active_select_li')){
        document.querySelector('.active_select_li').classList.remove('active_select_li')
        document.querySelector('.main_select').querySelector('.arrow').classList.remove('active_arrow')
        return;
    }
    item.className = 'active_select_li'
    ul.prepend(item)
    ul.scrollTop = item.offsetTop
    result.innerHTML = item.innerHTML
}
ul.addEventListener("scroll", function (){
    let value = input.value
    let exception = ul.querySelector('.active_select_li')
    if(ul.scrollTop + ul.clientHeight >= ul.scrollHeight - 100){
        if (value === ''){
            value = 'all'
        }
        if (exception == null){
            ajax(num, value, 0)
        }else{
            ajax(num, value, exception.id)
        }
        num = num + 20
    }
})
input.addEventListener('input', function (evt) {
    let exception = ul.querySelector('.active_select_li')
    ul.innerHTML = "";
    if (exception != null){
        ul.prepend(exception)
    }else{
        exception = 0
    }
    num = 0
    let value = input.value
    if (value === ''){
        value = 'all'
    }
    ajax(num,  value,  exception.id)

})
function ajax(num, value, exception) {
    $.ajax({
        url: '/search/'+num+'/'+value+'/'+exception,
        type: 'Get',
    }).done(function (data) {
        for (index = 0; index < data.length; ++index) {
            let newLi = document.createElement('li')
            newLi.id = data[index]['id']
            newLi.className = 'w-100 '
            newLi.innerHTML = data[index]['name']
            ul.appendChild(newLi)
        }
    })
}
function zeroingList(){
    let   value = 'all'
    let exception = ul.querySelector('.active_select_li')
    value = 'all'
    ul.innerHTML = "";
    input.value = ''
    num = 0
    if (exception == null){
        ajax(num,  value, 0)
    }else{
        ul.prepend(exception)
        ajax(num,  value,  exception.id)
    }
}
