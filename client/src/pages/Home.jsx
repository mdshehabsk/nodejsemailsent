import axios from "axios";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const Home = () => {
    let history = useHistory()
    const [value, setValue] = useState([""]);
  const loaduser = async () => {
    const data = await axios.get("http://localhost:8000/",{withCredentials:true});
    const actualData = data.data;
    if(actualData.success === false){history.push('/login')}
    setValue(actualData);
  };
  useEffect(() => {
    loaduser();
  }, []);
  const deleteUser = async (id) => {
    const del = await axios.delete(`http://localhost:8000/delete/${id}`);
    toast.success(del.data.message);
    loaduser();
  };
  
  return (
    <>
      <div className="container">
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col"> Username </th>
              <th scope="col">Email</th>
              <th scope="col">Modify</th>
            </tr>
          </thead>

          <tbody>
            { value.map((elem, ind) => {
              return (
                <tr key={ind}>
                  <th scope="row"> {elem.username} </th>
                  <td> {elem.email} </td>
                  <td>
  
                    <AiTwotoneEdit className="icon" />
                    <AiFillDelete
                      className="icon"
                      onClick={() => deleteUser(elem._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
export default Home;
