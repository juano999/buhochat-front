const publicRoutes = {
  LOGIN: "/login",
  REGISTER: "/registro",
  CHATS: "/chats",
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
