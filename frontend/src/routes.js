import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Comments from "./Pages/Comments/Comments";
import UsereTemplate from "./Pages/UsereTemplate/UsereTemplate";
import Orders from "./Pages/Orders/Orders";
import OffsTemplate from "./Pages/OffsTemplate/OffsTemplate";
import Admin from "./Pages/Admin/Admin";
import Page404 from "./Pages/Page404/Page404";

let routes = [
    { path: '/', element: <Home/> },
    { path: '/products', element: <Products /> },
    { path: '/comments', element: <Comments /> },
    { path: '/users', element: <UsereTemplate /> },
    { path: '/orders', element: <Orders /> },
    { path: '/offs', element: <OffsTemplate /> },
    { path: '/admin', element: <Admin /> },
    { path: '/*', element: <Page404/> },
]

export default routes