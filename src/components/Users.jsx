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
        role: '', //admin, gurest, cashier, manager
        active: true,
        profile: null
    });

    const loadUser = (user) => {
        setIsUserCreating(false);
        setFormData({
        id: 123,
        fullName: 'Alice',
        password: '',
        email: 'alice@example.com',
        bio: 'Hello!',
        role: 'adimin', //admin, gurest, cashier, manager
        active: false,
        profile: null
        });
    }

    // Handler for add price info form changes
    const handleAddUserInputChange = (e) => {
        const { name, value} = e.target;
        setFormData({ ...formData, [name]: value });
        console.log('input change triggered')
    };

    const handleClearformData = () => {        // Handler to clear user info textfields inside modal 
      console.log("clear user info triggered");
      setFormData({
        id: null,
        fullName: '',
        //fix this
        role: '',
        active: '',
        email: ''
      });
    };

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState('');

    const [isUserCreating, setIsUserCreating] = useState(true); //state for edit price modal

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        // axios supports AbortController via the "signal" option
        const res = await axios.get('https://lms-backend-project-ft6t.onrender.com/api/users/', { signal: controller.signal });
        
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
      }
    }

    fetchUsers();

    // cleanup: abort the request if the component unmounts
    return () => controller.abort();
  }, []);

  // Add a new price
  const handleCreateUser = async (formData) => {
    try {
      console.log(formData.username+" user created");
      //await registerUser(formData);
      //setAddPriceModalOpen(false);
      //loadPriceList();
      //handleClearInfo();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

    const handleUpdateUser = async (formData) => {
    try {
      console.log(formData.username+" user updated");
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

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
                    {users.map(user => (
<tr
            key={user._id ?? user.id}                     // use correct id field
            onClick={() => loadUser(user)}
            onKeyDown={(e) => {
              // make Enter or Space activate the row (keyboard accessible)
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
                  onClick={(e) => e.stopPropagation()} // prevent row click when toggling checkbox
                />
              </div>
            </td>

            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
              {user._id ?? user.id}
            </th>
            <td className="px-6 py-4">{user.username}</td>
            <td className="px-6 py-4">{user.userRole}</td>
            <td className="px-6 py-4">{user.active ? 'Active' : 'Unavailable'}</td>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">
              <button
                type="button"
                onClick={(e) => handleDelete(user._id ?? user.id, e)}
                className="font-medium text-blue-600 mx-3 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>                    ))}
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
            <form action="">
            <label className="block text-gray-500 mb-1">Name</label>
                <input
                    type="text"
                    name="fullName"
                    className="mb-3 w-full p-2 rounded-md bg-gray-50 border-gray-50 border border-gray-200 p-3 text-gray-900  focus:border-1 focus:border-purple-500"
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
                            // value={role}
                            onChange={handleAddUserInputChange}
                            className="mb-3 w-full p-2 text-gray-200 rounded-md bg-gray-50 border-gray-50 border border-gray-200 p-3 text-gray-900 focus:border-1 focus:border-purple-500"
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
                            id="status"
                            name="status"
                            // value={role}
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
                    className="mb-3 w-full p-2 rounded-md bg-gray-50 border-gray-50 border border-gray-200 p-3 text-gray-900  focus:border-1 focus:border-purple-500"
                    placeholder="Enter employee password"
                    value={formData.password}
                    onChange={handleAddUserInputChange}
                    />

                <div className='w-full flex justify-end gap-6 mt-8'>
                <button
                type="button"
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                onClick={(e) => {
                    //e.preventDefault(); // optional
                    isUserCreating ? handleCreateUser(e) : handleUpdateUser(e);
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
            </div>
            </div>
        </div>
        </>
  )
}

export default Users