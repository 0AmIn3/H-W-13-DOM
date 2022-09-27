import {movies} from '../modules/db.js'
let promoImg = document.querySelectorAll('.promo__adv img')
let promo__bg = document.querySelector('.promo__bg')
let promo__genre = document.querySelectorAll('.promo__genre')
let promo__title = document.querySelectorAll('.promo__title')
let promo__descr = document.querySelectorAll('.promo__descr')
let promo__ratings = document.querySelectorAll(".promo__ratings span")
let search = document.querySelector('#search')

let ul = document.querySelector('.promo__interactive-list')

let moviesArr = movies


promoImg.forEach((img) => {
    img.remove(img)
})


search.onkeyup = () => {
    let {value} = search
    value = value.toLowerCase().trim()
    
    let filtered = moviesArr.filter(item => {
        let {Title} = item
        Title = Title.toLowerCase().trim()

        if(Title.includes(value)) {
            return item
        }
    })


    reload(filtered)
}

let close_text = document.querySelector('.close_text')
const reload = (arr) => {
    ul.innerHTML = ""
    showMovie(arr[0])

    arr.forEach((item, index) =>{
        let span = document.createElement('span')
        
        let li = document.createElement('li')
        let delet = document.createElement('div')
        
        li.classList.add('promo__interactive-item')
    
        span.innerHTML = `${index + 1}.${item.Title}`
        span.style.cursor = 'pointer'
        delet.classList.add('delete')
    
        ul.append(li)
        li.append(span ,delet)

        // functions
        span.onclick = () => {
            showWindow(item)
            showMovie(item)
        }
        delet.onclick = () => {
            moviesArr = moviesArr.filter(film => film.ID !== item.ID)

            reload(moviesArr)
        }
        close_text.onclick = () => {
            closeMovie()
        }
        
    })
}
let window = document.querySelector('.window')
let widow_right = document.querySelector('.widow_right')
let window_bg = document.querySelector('.window_bg')


const showMovie = (movie) => {
    // console.log(movie);
    
    promo__bg.style.background = `url(${movie.Poster}) center center/cover`
    promo__genre[0].innerHTML = movie.Genre
    promo__title[0].innerHTML = movie.Title
    promo__descr[0].innerHTML = movie.Plot
    promo__ratings[0].innerHTML =  `IMDb: ${movie.imdbRating}`
    promo__ratings[1].innerHTML =  `Кинопоиск: ${movie.Metascore}`




}

const showWindow = (movie) => {
    // console.log(movie);
    
    widow_right.style.background = `url(${movie.Poster}) center center/cover`
    promo__ratings[2].innerHTML =  `IMDb: ${movie.imdbRating}`
    promo__ratings[3].innerHTML =  `Кинопоиск: ${movie.Metascore}`
    promo__genre[1].innerHTML = movie.Genre
    promo__title[1].innerHTML = movie.Title
    promo__descr[1].innerHTML = movie.Plot

    window_bg.style.display = 'block'
    window.style.left = '50%'
    window.style.opacity = '1'
    setTimeout(() => {
        promo__genre[1].style.opacity = '1'
    }, 300);
    setTimeout(() => {
        promo__title[1].style.opacity = '1'
    }, 500);
    setTimeout(() => {
        promo__descr[1].style.opacity = '1'
    }, 700);
    setTimeout(() => {
        promo__ratings[2].style.opacity = '1'
        promo__ratings[3].style.opacity = '1'
    }, 900);

}

const closeMovie = () => {
    window_bg.style.display = 'none'
    window.style.left = '100%'
    window.style.opacity = '0'
    setTimeout(() => {
        window.style.left = '-100%'
    }, 200);
    promo__genre[1].style.opacity = '0'
    promo__title[1].style.opacity = '0'
    promo__descr[1].style.opacity = '0'
    promo__ratings[2].style.opacity = '0'
    promo__ratings[3].style.opacity = '0'
}


reload(moviesArr)

