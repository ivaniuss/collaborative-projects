import React, { useState } from 'react';
React

const RegisterLogin = () => {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white rounded shadow-md">
        <h2 className="text-black text-2xl font-bold mb-2 text-center">Register or Login</h2>
        <p className="text-black text-center mb-6">Experience our platform with an account</p>
        <div className="flex justify-around mb-6">
          <button
            className={`px-4 py-2 ${isRegister ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
          <button
            className={`px-4 py-2 ${!isRegister ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
        </div>
        {isRegister ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Name:</label>
              <input
                type="text"
                placeholder="Enter your username..."
                className="bg-white w-full px-3 py-2 border border-gray-300 rounded text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Email:</label>
              <input
                type="email"
                placeholder="Enter your Email..."
                className="bg-white w-full px-3 py-2 border border-gray-300 rounded text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Password:</label>
              <input
                type="password"
                placeholder="Enter your password..."
                className="bg-white w-full px-3 py-2 border border-gray-300 rounded text-black"
              />
            </div>
            <button className="w-full py-2 mt-4 bg-black text-white rounded">Register</button>
          </form>
        ) : (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Name:</label>
              <input
                type="text"
                placeholder="Enter your username..."
                className="bg-white w-full px-3 py-2 border border-gray-300 rounded text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Password:</label>
              <input
                type="password"
                placeholder="Enter your password..."
                className="bg-white w-full px-3 py-2 border border-gray-300 rounded text-black"
              />
            </div>
            <button className="w-full py-2 mt-4 bg-black text-white rounded">Login</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default RegisterLogin;