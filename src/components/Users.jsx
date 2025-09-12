import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
function Users() {
    
    const [users, setUsers] = useState([]);
    //to store the data of the add user modal till submit
    const [formData, setFormData] = useState({     // Price info state
        id: null,
        fullName: '',
        password: '',
        email: '',
        bio: '',
        role: '', //admin, guest, cashier, manager
        active: true,
        profile: null
    });

    //const controller = new AbortController();
    async function fetchUsers() {
      setTableLoading(true);
      try {
        // axios supports AbortController via the "signal" option
        const res = await axios.get('https://lms-backend-project-ft6t.onrender.com/api/users/', /*{ signal: controller.signal }*/);
        
        setUsers(res.data.data);
        // raw response info
        // console.log('HTTP status:', res.status);
        // console.log('Axios response object:', res);
        // // the JSON body you're interested in:
        // console.log('response.data:', res.data);
        // // nicely formatted JSON (optional)
        // console.log('pretty JSON:\n', JSON.stringify(res.data, null, 2));
      } catch (err) {
        // request cancelled
        if (err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError') {
          console.log('Request was canceled/aborted');
          return;
        }

        // server responded with a non-2xx status
        if (err.response) {
          console.error('Server error:', err.response.status, err.response.data);
        } else {
          // network / other errors
          console.error('Error fetching users:', err.message || err);
        }
      } finally{
        setTableLoading(false);
      }
    }

  useEffect(() => {
    
    fetchUsers();

    // cleanup: abort the request if the component unmounts
    //return () => controller.abort();
  }, []);


    const loadUser = (user) => {
      console.log(user);
        setIsUserCreating(false);
        setFormData({
        id: user._id,
        fullName: user.username,
        password: user.password,
        email: user.email,
        bio: user.bio,
        role: user.userRole, // typo kept by wenuja //admin, gurest, cashier, manager
        active: user.isActive,
        profile: user.profilePicture,
        });
    }

    const createUser = async () => {
      setFormLoading(true);
      //do the validation here
      try {
        console.log(formData);
        const res = await axios.post(
          'https://lms-backend-project-ft6t.onrender.com/api/users',
          {
            username: formData.fullName,
            password: formData.password,
            email: formData.email,
            userROle: formData.role, // typo intentionally kept from wenuja
            isActive: formData.active,
            profilePicture: formData.profile,
            bio: formData.bio,
          }
        );
        fetchUsers();

        console.log('HTTP status:', res.status);
        if(res.status==true){
          console.log("user created");
        handleClearformData();
        }
        console.log('Response data:', res.data);
      } catch (err) {
        if (err.response) {
          console.error('Server responded with error:', err.response.status, err.response.data, err.message);
        } else {
          console.error('Request error:', err.message || err);
        }
      } finally{
        setFormLoading(false);
      }
    };

    const updateUser = async () => {
      setFormLoading(true);
      //do the validation here
      try {
        console.log(formData);
        console.log(formData);
        const res = await axios.put(
          `https://lms-backend-project-ft6t.onrender.com/api/users/${formData.id}`,
          // `https://lms-backend-project-ft6t.onrender.com/api/users/6898682dee9a5333e805f261`,
          {
            username: "namal",
            password: "Namal@12345",
            email: "namal@email.com",
            userROle: "Guest", // typo intentionally kept from wenuja
            isActive: true,
            profilePicture: "image.com",
            bio: "this is the bio",
          }
        );
        fetchUsers();

        console.log('HTTP status:', res.status);
        if(res.status==true){
          console.log("user created");
          handleClearformData();
        }
        console.log('Response data:', res.data);
      } catch (err) {
        if (err.response) {
          console.error('Server responded with error:', err.response.status, err.response.data, err.message);
        } else {
          console.error('Request error:', err.message || err);
        }
      }finally{
        setFormLoading(false);
      }
    };


        const deleteUser = async (userId) => {
      //do the validation here
      try {
        console.log("user id: "+userId);
        const res = await axios.delete(
          //`https://lms-backend-project-ft6t.onrender.com/api/users/${formData.id}`,
          `https://lms-backend-project-ft6t.onrender.com/api/users/${userId}`);
          
          console.log('delete HTTP status:', res.status);
          console.log('delete Response data:', res.data);
          fetchUsers();
      } catch (err) {
        if (err.response) {
          console.error('Server responded with error:', err.response.status, err.response.data, err.message);
        } else {
          console.error('Request error:', err.message || err);
        }
      }
    };

    // Handler for add price info form changes
    const handleAddUserInputChange = (e) => {
      const { name, value} = e.target;
      console.log(name+': '+value)
        setFormData({ ...formData, [name]: value });
    };

    const handleClearformData = () => {        // Handler to clear user info textfields inside modal 
      console.log("clear user info triggered");
      setFormData({
        id: null,
        fullName: '',
        password: '',
        email: '',
        bio: '',
        role: '', //admin, guest, cashier, manager
        active: true,
        profile: '',
      });
    };

    const [tableLoading, setTableLoading] = useState(true);
    const [formLoading, setFormLoading] = useState(false);
    // const [error, setError] = useState('');
    const [isUserCreating, setIsUserCreating] = useState(true); //state for edit price modal


    //const [roleFilter, setRoleFilter] = useState('All');
    // const handleRoleFilterChange = (e) => {
    //     setRoleFilter(e.target.value);
    // };
    // const filteredSalesData = roleFilter === 'All' ? users : users.filter(user => user.role === roleFilter);

  return (
    <>
    <div className="relative overflow-x-auto sm:rounded-lg my-14 p-4">
            <div className="pb-10">
                <h2 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Users</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos possimus rerum hic nesciunt error at, ipsa laboriosam culpa quasi nemo nisi maiores vero minus. Amet, non enim</p>
            </div>

            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 px-8">
                {/* <div className="flex gap-4">
                    <select value={roleFilter} onChange={handleRoleFilterChange} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5">
                        <option value="All">All Branches</option>
                        <option value="cashier">Cashier</option>
                        <option value="manager">Manager</option>
                        <option value="assistant">Assistant</option>
                    </select>
                </div> */}
            </div>
            <div className='flex gap-6'>
            {/* left sedction */}
            <div className='w-2/3'>
            <table className="w-full text-md text-left rtl:text-right text-gray-500">
                <thead className="text-sm text-gray-50 uppercase bg-purple-700">
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                                <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">#No</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Role</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
<tbody>
        {tableLoading ? (
          // Spinner row that spans all columns
          <tr>
            <td colSpan={7} className="py-8 text-center">
              <div role="status" aria-live="polite" className="inline-flex items-center gap-3">
                <svg
                  className="w-6 h-6 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>Loading...</span>
              </div>
            </td>
          </tr>
        ) : (
          users.map((user, index) => (
            <tr
              key={user._id ?? user.id}
              onClick={() => loadUser(user)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                  e.preventDefault();
                  loadUser(user);
                }
              }}
              role="button"
              tabIndex={0}
              className="bg-white border-b hover:bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${user._id ?? user.id}`}
                    type="checkbox"
                    className="w-4 h-4"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </td>

              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {index + 1}
              </th>

              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.userRole}</td>
              <td className="px-6 py-4">{user.active ? 'Active' : 'Unavailable'}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteUser(user.id);
                  }}
                  className="font-medium text-blue-600 mx-3 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
            </table>

            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 my-5" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                    Showing <span className="font-semibold text-gray-900">1-10</span> of <span className="font-semibold text-gray-900">20</span>
                </span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Previous</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">2</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Next</a>
                    </li>
                </ul>
            </nav>
            </div>
            {/* right section(form) */}

            <div className="w-1/3 bg-white">

{formLoading ? (
          // Spinner row that spans all columns
              <div role="status" aria-live="polite" className="inline-flex items-center gap-3">
                <svg
                  className="w-6 h-6 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                <span>Loading...</span>
              </div>
        ) : (

            <form action="">
            <label className="block text-gray-500 mb-1">Name</label>
                <input
                    type="text"
                    name="fullName"
                    className="mb-3 w-full rounded-md bg-gray-50 border-gray-50 border p-3 text-gray-900  focus:border-1 focus:border-purple-500"
                    placeholder="Enter employee name"
                    value={formData.fullName}
                    onChange={handleAddUserInputChange}
                    />
            <label className="block text-gray-500 mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    className="mb-3 w-full p-2 rounded-md bg-gray-50 border-gray-50 border border-gray-200 p-3 text-gray-900  focus:border-1 focus:border-purple-500"
                    placeholder="Enter employee email address"
                    value={formData.email}
                    onChange={handleAddUserInputChange}
                    />
            <span className='flex flex-row gap-2'>
                <span className='w-1/2 '>
                <label className="block text-gray-500 mb-1">User Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleAddUserInputChange}
                            className="mb-3 w-full p-2 text-gray-200 rounded-md bg-gray-50 border-gray-50 border p-3 text-gray-900 focus:border-1 focus:border-purple-500"
                            >
                            <option value="" disabled>
                                Select a Role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="cashier">Cashier</option>
                            <option value="guest">Guest</option>
                            <option value="manager">Manager</option>
                        </select>
                </span>
                <span className='w-1/2 '>
                <label className="block text-gray-500 mb-1">Status</label>
                        <select
                            id="active"
                            name="active"
                            value={formData.active}
                            onChange={handleAddUserInputChange}
                            className="mb-3 w-full p-2 text-gray-200 rounded-md bg-gray-50 border-gray-50 border border-gray-200 p-3 text-gray-900 focus:border-1 focus:border-purple-500"
                            >
                            <option value="" disabled>
                                Status
                            </option>
                            <option value={true}>Active</option>
                            <option value={false}>Disabled</option>
                        </select>
                </span>
            </span>

            <label className="block text-gray-500 mb-1">Password</label>
                <input
                    type="password"
                    name="password"
                    className="mb-3 w-full rounded-md bg-gray-50 border-gray-50 border p-3 text-gray-900  focus:border-1 focus:border-purple-500"
                    placeholder="Enter employee password"
                    value={formData.password}
                    onChange={handleAddUserInputChange}
                    />

            <label className="block text-gray-500 mb-1">Bio</label>
                <textarea
                  name="bio"
                  rows={3}
                  className="mb-3 w-full rounded-md bg-gray-50 border border-gray-200 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter employee name"
                  value={formData.bio}
                  onChange={handleAddUserInputChange}
                />

                <div className='w-full flex justify-end gap-6 mt-2'>
                <button
                type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                onClick={(e) => {
                    //e.preventDefault(); // optional
                    isUserCreating ? createUser() : updateUser();
                }}
                >
                {isUserCreating ? 'Create User' : 'Update User'}
                </button>

                <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-600 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                  onClick={
                        handleClearformData
                    }
                >Clear 
                </button>
                <button type="button" className="text-red-500 bg-white border border-red-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => {
                        setIsUserCreating(false);
                        
                    }}
                >
                    Cancel
                </button>

                </div>
            </form>
                    )}
            </div>
            </div>
        </div>
        </>
  )
}

export default Users