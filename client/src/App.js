import logo from './logo.svg';
import './App.css';

import CoachList from "./components/CoachList";
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'
import AddCoach from "./components/AddCoach";
import { useAuth0 } from '@auth0/auth0-react'
import Profile from "./components/Profile";
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';
import Coach from './components/Coach';
import CoachDetail from './components/CoachDetail';
import EditCoach from './components/EditCoach';
import NavBar from './components/NavBar';
import Search from './components/Search';
import Map from './components/GoogleMaps';
import 'bootstrap/dist/css/bootstrap.min.css';

import Card from "react-bootstrap/Card";
import HomeImage from './components/HomeImage';



function App() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [coaches, setCoaches] = useState([]);
  // const [users, setUsers] = useState([]);

  //const baseURL = "http://localhost:5000";
  const baseURL = process.env.REACT_APP_BASEURL;

  useEffect(() => {
    async function fetchCoaches() {
      const data = await fetch(baseURL + "/coaches2");
      const jsonData = await data.json();
      console.log(jsonData);
      setCoaches(jsonData);
    }
    fetchCoaches();
  }, [coaches.length])

  // useEffect(() => {
  //   async function fetchUsers() {
  //     const data = await fetch(baseURL + "/users");
  //     const jsonData = await data.json();
  //     console.log(jsonData);
  //     setUsers(jsonData);
  //   }
  //   fetchUsers();
  // }, [users.length])

  // const addUser = async (user) => {
  //   const names = users.map(user => user.userName);
  //   if (!names.includes(user.nickname)) {
  //     const tmp = await fetch(baseURL + "/users",
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           userName: user.nickname
  //         })
  //       });
  //     const newUser = tmp.json();
  //     setUsers([...users, newUser]);
  //     console.log("now users:", users);
  //   }
  // }

  // if (isAuthenticated) {
  //   addUser(user);
  // }




  const addCoach = async (coach) => {
    console.log('coach is here:', coach);
    const tmp = await fetch(baseURL + "/coaches2",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: user.nickname,
          coach: coach,
        })
      })
    const newCoach = await tmp.json();
    setCoaches([...coaches, newCoach]);
  }




  const deleteCoach = async (id) => {
    console.log("delete things， id:");
    console.log(id);
    await fetch(`http://localhost:5000/coaches2/${id}`,
      {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
      });
    setCoaches(coaches.filter(coach => coach._id !== id));
    navigate(`/coaches`);
  }

  const editCoach = async (coach) => {
    // await addCoach(coach);
  }


  console.log("is authed?", isAuthenticated);
  const cords = [[-123.2215338, 49.3801377, "Grouse Mountain"],
  [-122.9744539, 50.0591648, "Whistler Mountain"],
  [-123.2067337, 49.396018, "Cypress Mountain"]];

  return (
    <>
      {isLoading ? <p>Loading,please wait ^_^ </p> :
        <div className="App">
          <NavBar isAuthed={isAuthenticated} />
          <Card className='border-0'>
            <Card.Body>
              <Card.Title>PLACEHOLDER </Card.Title>
              <Card.Title>PLACEHOLDER </Card.Title>
            </Card.Body>
          </Card>

          <Routes>
            <Route path="/profile" element={<ProtectedRoute protectedCompo={Profile} />}></Route>
            <Route path="/" element={
              <>
                <HomeImage />
                <CoachList deleteCoach={deleteCoach} coaches={coaches} editCoach={editCoach} />
                <Map coordinates={cords} />

              </>
            }></Route>
            <Route path="/new" element={<AddCoach addCoach={addCoach} />}></Route>
            <Route path="/coaches" element={
              <>
                {coaches.length > 0 ? (
                  <ul>
                    <CoachList deleteCoach={deleteCoach} coaches={coaches} editCoach={editCoach} />
                  </ul>
                ) :
                  (<p>Awww! There are no coaches to show.</p>)}
              </>
            }></Route>
            <Route path="/coaches/:id" element={
              <>
                <CoachDetail deleteCoach={deleteCoach} />
              </>
            }></Route>
            <Route path="/coaches/:id/edit" element={<EditCoach />}></Route>
            <Route path="/search" element={
              <Search coaches={coaches} />
            }></Route>

            <Route path="*" element={<p>Empty!</p>}></Route>
          </Routes>

          <Footer />
        </div>
      }
    </>
  );
}
export default App;
