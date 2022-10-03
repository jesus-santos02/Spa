import { Header } from '/app/components/Header.js';
import Loader from '/app/components/Loader.js';
import { Main } from '/app/components/Main.js';
import { Router } from '/app/components/Router.js';
import { InfiniteScroll } from '/app/helpers/infinite_scroll.js';

export function App() {
    const $root = document.getElementById('root');

    $root.innerHTML = null;

    $root.appendChild(Header());
    $root.appendChild(Main());
    $root.appendChild(Loader());

    Router();
    InfiniteScroll();    
}











/* ajax({
    url: api.POSTS,
    cbSuccess: (posts) => {
        console.log(posts);
    }
});

ajax({
    url: api.CATEGORIES,
    cbSuccess: (categories) => console.log(categories)
});*/

//console.log(api); 