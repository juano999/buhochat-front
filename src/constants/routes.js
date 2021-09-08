const publicRoutes = {
    LOGIN: "/login",
    REGISTER: "/registro",
    // USERS: "/usuarios",
    // USERS_ID: `/usuario/:id`,
};

const privateRoutes = {
    HOME: "/",
    // ARTICLE_ID: "/articulo/:id",
};

const Routes = {
    ...publicRoutes,
    ...privateRoutes,
};
export default Routes;