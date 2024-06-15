import { BrowserRouter, Routes, Route, Link, NavLink, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'

// Pages
import About from './Pages/About';
import Home from './Pages/Home';
import RootLayout from './Layout/RootLayout'
import HelpLayout from './Layout/HelpLayout';
import Contact, { contactAction } from '../src/Pages/help/Contact'
import FAQ from '../src/Pages/help/Faq'
import NotFound from './Pages/help/NotFound';
import CareerLayout from '../src/Layout/CareerLayout'
import Careers, { careersLoader } from '../src/Pages/careers/Careers'
import CareerDetails, { careerDetailsLoader } from './Pages/careers/CareerDetails';
import CareerError from './Pages/careers/CareerError';

function App() {
  const router = createBrowserRouter(
    // modern way to create routes 
    createRoutesFromElements(
      // can assign a element here to can act as a layout or wrap a page component 
      // layout component will wrap the content inside this which is home and about 
      // However, we cant see the page content such as home and about since we are nto telling react router where inside the layout, where we ant to render these page components. that is why use outlet 
      <Route path='/' element={<RootLayout />}>
        {/*  when I go to some path, this element will be shown */}
        {/*  when I go to / or root path of the site, it will take the home content and will be rendered into this main tag*/}
        {/*  when I go to about path of the site, it will take the about content and will be rendered into this main tag which will be swapped */}

        <Route index element={<Home />} />
        {/* <Route index element={<Home />} /> same thing as above */}
        {/*react will know that this will be a path  */}
        {/*Dont need additional / since its replative to the parent path*/}
        <Route path="about" element={<About />} />
        {/* forward slash will be automatically added after about in the path and others paths as well from react-router */}
        <Route path='help' element={<HelpLayout />}>
          {/* /help/faq */}
          <Route path="faq" element={<FAQ />} />
          {/* /help/contact */}
          <Route path="contact" element={<Contact />} action={contactAction} />

        </Route>

        <Route path='careers' element={<CareerLayout />}>
          {/* /help/faq */}
          <Route
            index
            element={<Careers />}
            loader={careersLoader}
            // whenever we visit this route, this function will run before it renders careers component
            errorElement={<CareerError />} // can also paste this error element on the parent route careers
          />
          <Route
            // /careers/123
            // /careers/abc <- has to be different ids like params
            path=':id' // colon signifies that it will be chanangle part of the route or a paramter
            // then we can capture that when we enter that route 
            element={<CareerDetails />}
            loader={careerDetailsLoader}
            errorElement={<CareerError />}
          // if we thrown an error in career details (element), I want you take this error and inject that error in careerrror.
          />

        </Route>
        <Route path='*' element={<NotFound />} />



      </Route>
    )
  )

  return (

    <RouterProvider router={router} />

  );
}

export default App


// OLD WAY 
// < BrowserRouter >
//   <header>
//     <nav>
//       <h1>JobRouter</h1>
//       <NavLink to='/'>Home</NavLink>

//       {/* by using the navlinks you can style better. in html, it will make this link active . you can change the css only if the page is active */}
//       <NavLink to='about'>About</NavLink>
//       {/* by adding the above, it will look at the link and then match the route path below, and request to server is intercepted, content is just swapped and not get fresh copies of html*/}
//     </nav>
//   </header>
// <main>
//   <Routes>
//     {/*  when I go to some path, this element will be shown */}
//     {/*  when I go to / or root path of the site, it will take the home content and will be rendered into this main tag*/}
//     {/*  when I go to about path of the site, it will take the about content and will be rendered into this main tag which will be swapped */}

//     <Route path="/" element={<Home />} />
//     {/* <Route index element={<Home />} /> same thing as above */}
//     {/*react will know that this will be a path  */}
//     <Route path="about" element={<About />} />

//   </Routes>
// </main>
//   </BrowserRouter >