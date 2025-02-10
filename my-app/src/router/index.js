const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.inNotAuthenticated) {
        next();
        return;
    }
    next('/');
};

const ifAuthenticated = (to, from, next) => {
    if (!store.getters.inAuthenticated) {
        next();
        return;
    }
    next('/login');
};

const routes = [
    {
        path: '/',
        name: 'home',
        component: function () {
            return import('../views/HomeView.vue');
        },
        beforeEnter: ifAuthenticated,
    },
    {
        path: '/login',
        name: 'login',
        component: function () {
            return import('../components/Login.vue');
        },
        beforeEnter: ifNotAuthenticated,
    },
]