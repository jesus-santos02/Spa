import api from '/app/helpers/wp_api.js';
import { ajax } from '/app/helpers/ajax.js';
import { PostCard } from '/app/components/PostCard.js';
import { Post } from '/app/components/Post.js';
import { SearchCard } from '/app/components/SearchCard.js';
import { ContactForm } from '/app/components/ContactForm.js';

export async function Router() {
    const d = document,
        w = window,
        $main = d.getElementById('main');

    let { hash } = location;
    console.log(hash);

    $main.innerHTML = null;

    if (!hash || hash === '#/') {
        await ajax({
            url: api.POSTS,
            cbSuccess: (posts) => {
                //console.log(posts);
                let html = '';
                posts.forEach(post => html += PostCard(post));
                $main.innerHTML = html;
            }
        });
        console.log(api.POST)

    } else if (hash.includes('#/search')) {
        let query = localStorage.getItem('wpSearch');

        if(!query) {
            d.querySelector('.loader').style.display = 'none';
        
            return false;
        }

        console.log(`${api.SEARCH}${query}`);

        await ajax({
            url: `${api.SEARCH}${query}`,
            cbSuccess: (search) => {
                console.log(search);
                let html = '';

                if(search.length === 0) {
                    html = `<p class="error">No existen resultados de búsqueda para el termino: <mark>${query}</mark></p>`;
                }else {
                    search.forEach(post => html += SearchCard(post));
                }

                $main.innerHTML = html;
            }
        });

    } else if (hash === '#/contacto') {
        $main.appendChild(ContactForm());

    } else {
        await ajax({
            url: `${api.POST}/${localStorage.getItem('wpPostId')}`,
            cbSuccess: (post) => {
                console.log(post);
                let html = Post(post);
                $main.innerHTML = html;
            }
        });
    }

    d.querySelector('.loader').style.display = 'none';
}