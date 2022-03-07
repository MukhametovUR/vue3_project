import axios from "axios";
export const postModule = {
    state: () => ({ //Функция, которая меняет объект
        posts: [],
            isPostsLoading: false,//Индикатор загрузки страницы
            selectedSort: '',
            searchQuery:'',
            page:1,
            limit:10,
            totalPages: 0,
            sortOptions: [
                {value:'title', name:'По названию'},
                {value:'body', name:'По описанию'}
            ]
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2)=> post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
            // Массив с постами разворачивапм в другой массив для сортировки нового массива
        },
        sortedAndSearchedPosts(state, getters){
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts){
            state.posts = posts;
        },
        setLoading(state,bool){
            state.isPostsLoading = bool;
        },
        setPage(state,page){
            state.page = page;
        },
        setSelectedSort(state){
            state.selectedSort = selectedSort;
        },
        setTotalPages(state, totalPages){
            state.totalPages = totalPages;
        },
        setSearchQuery(state, searchQuery){
            state.searchQuery = searchQuery;
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {             
                commit("setLoading", true)
                // this.isPostsLoading = true;//Отображаем индикатор загрузки перед отправкой запроса   
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        }
                    });
                    commit("setTotalPages", Math.ceil(response.headers['x-total-count'] / state.limit));
                    commit("setPosts",response.data);
                    //this.posts = response.data;

                //Делаем запрос на сервер и ответ помещаем в response
            }catch(e){
                //Отлавливаем ошибки при запросе на сервер
                // alert('Ошибка')
                console.log(e)
            }finally {
              commit("setLoading", false);//Скрываем индикатор загрузки после получение ответа
            }
        },
        async loadMorePosts({state, commit}) {
            try { 
                // this.page += 1;
                commit("setPage",state.page + 1)            
                    const response = await axios.get('https://jsonplaceholder.typicode.com/posts',{
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        }
                    });
                    commit("setTotalPages", Math.ceil(response.headers['x-total-count'] / this.limit))
                    commit(setPosts,[...state.posts, ...response.data]);
                //Делаем запрос на сервер и ответ помещаем в response
            }catch(e){
                //Отлавливаем ошибки при запросе на сервер
                // alert('Ошибка')
                console.log(e)
            }
        },
    },
    namespaced: true
}