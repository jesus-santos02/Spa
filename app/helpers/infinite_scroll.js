import api from '/app/helpers/wp_api.js';
import {PostCard} from '/app/components/PostCard.js';
import {SearchCard} from '/app/components/SearchCard.js';
import {ajax} from '/app/helpers/ajax.js';

export async function InfiniteScroll() {
    const d = document,
        w = window;

    let query = localStorage.getItem('wpSearch'),
        apiURL,
        Component; //High Order Component (HOC) - https://es.reactjs.org/docs/higher-order-components.html

    w.addEventListener('scroll', async (e) => {
        let {scrollTop, clientHeight, scrollHeight} = d.documentElement,
            {hash} = w.location;

        //console.log(scrollTop, clientHeight, scrollHeight, hash);

        if(scrollTop + clientHeight >= scrollHeight) {
            api.page++;

            if(!hash || hash === '#/') {
                apiURL = `${api.POSTS}&page=${api.page}`;
                Component = PostCard;

            }else if(hash.includes('#/search')) {
                apiURL = `${api.SEARCH}${query}&page=${api.page}`;
                Component = SearchCard;

            }else {
                return false;
            }

            d.querySelector('.loader').style.display = 'block';

            await ajax({
                url: apiURL,
                cbSuccess: (posts) => {
                    //console.log(posts);
                    let html = '';
                    posts.forEach(post => html += Component(post));

                    d.getElementById('main').insertAdjacentHTML('beforeend', html);
                    d.querySelector('.loader').style.display = 'none';
                }
            });
        }
    });
}