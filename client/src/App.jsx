import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import { useDispatch } from 'react-redux';
import {signOutUserSuccess, signInSuccess} from './redux/user/userSlice'
import {useEffect, useState} from 'react'

export default function App() {
  // console.log("hi")
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   // authService.getCurrentUser()

  //   const response = fetch('http://localhost:3000/api/user/getUser', {
  //     method: 'GET',
  //     credentials: 'include', 
  //   });
  //   // .then((userData) => {
  //     console.log('user data in app', response);
  //     const userData = response.json();
  //     if (userData) {
  //       dispatch(signInSuccess({ userData }));
  //     } else {
  //       dispatch(signOutUserSuccess()); 
  //     }
  //   // })
  //   // .finally(() => {
  //   //   // setLoading(false)
  //   //   // console.log("Work")
  //   // }
  // // );

  // }, [dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/getUser', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const userData = await response.json();
        // console.log('User data in App:', userData);

        if (userData) {
          dispatch(signInSuccess(userData));
        } else {
          dispatch(signOutUserSuccess());
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        dispatch(signOutUserSuccess());
      } finally {
        // Optional: if you have a loading state, set it here
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);


  return loading ? 
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Loading...</h2>
      </div>
      : (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
        <Route path='/listing/:listingId' element={<Listing />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route
            path='/update-listing/:listingId'
            element={<UpdateListing />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
