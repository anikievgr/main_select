
let input = document.querySelector('#input_select')
var ul = document.querySelector('#select_content')
let li = ul.querySelectorAll('li')
document.querySelector('#input_select').addEventListener('click', function (){
    ul.scrollTop = 0
    ul.classList.toggle('active_select')
})
window.onclick = function(e) {
  if (e.composedPath().includes(input) === false){
      ul.scrollTop = 0
      ul.classList.remove('active_select')
  }
}
ul.onclick = function (e){
        let item = e.target
    if (document.querySelector('.active_select_li') != null){
        document.querySelector('.active_select_li').classList.remove('active_select_li')
    }
    e.target.remove()
    ul.prepend(item)
    item.classList.add('active_select_li')
    ul.scrollTop = item.offsetTop
    input.value = item.innerHTML
}
ajax()
function ajax(){
    let num = 10;

    ul.addEventListener("scroll", function (){
        if(ul.scrollTop + ul.clientHeight >= ul.scrollHeight - 100){

            $.ajax({
                url:'/search/'+ num,
                type:'Get',
            }).done(function (data){
                for (index = 0; index < data.length; ++index) {
                    let newLi = document.createElement('li')
                    newLi.id = data[index]['id']
                    newLi.className = 'w-100'
                    newLi.innerHTML = data[index]['name']
                    ul.appendChild(newLi)

                }
            })
            num = num + 2;
        }

    });
}

