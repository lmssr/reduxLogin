import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userSelector, fetchUserBytoken, clearState } from './UserSlice';
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector(userSelector);
  useEffect(() => {
    dispatch(fetchUserBytoken({ token: localStorage.getItem('token') }));
  }, []);

  const { username, email, phone } = useSelector(userSelector);

  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push('/login');
    }
  }, [isError]);

  const onLogOut = () => {
    localStorage.removeItem('token');
    dispatch(clearState());
    history.push('/login');
  };

  return (
    <div>
      {isFetching ? (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      ) : (
        <Fragment>
          <nav class="w-full bg-white border-gray-200 sm:px-4 py-2.5" style={{backgroundColor: '#6a62d2'}}>
            <div class=" flex flex-wrap justify-between items-center mx-auto">
              <div class="flex">
              <a href="#" class="flex items-center">
              <img src="https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png" class="mr-3 h-6 sm:h-10 rounded-full" alt="Avatar" />
              </a>
              <div className='flex flex-col text-left text-white'>
                <p className='font-bold'>{username} Leanne Graham</p>
                <p>{phone} 1-770-736-8031 x56442</p>
              </div>
              </div>
            <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
              <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <button
                    onClick={onLogOut}
                    className="bg-white text-white font-bold py-2 px-4 rounded text-gray-700"
                  >
                  log out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className=" mx-auto grid grid-cols-2 w-1/2 pt-40 divide-x divide-gray-400">
          <div className=" border-solid px-12 -mt-8 grid grid-cols-1 text-right items-end ">
            <img src="https://emedia1.nhs.wales/HEIW2/cache/file/F4C33EF0-69EE-4445-94018B01ADCF6FD4.png" 
                 className="w-32 h-32 rounded-full border-solid border-2 border-gray-400 ml-36 " 
                 alt="Avatar" />
          <div className='leading-tight'>
            <p>{username} Leanne Graham</p>
            <p>{phone} 1-770-736-8031 x56442</p>
            <p>{email} Sincere@april.biz</p>
          </div>
          </div>
          <div className="divide-y divide-gray-400 text-left leading-10 px-12">
            <p>{} Street: Kulas Light</p>
            <p>{} City: Gwenborough</p>
            <p>{} Suit: Apt. 556</p>
            <p>{} Zip: Apt. 556</p>
            <p>{} Website: hildegard.org</p>
            <p>{} Company Name: Romaguera-Crona</p>
          </div>
          </div>
        <footer className="p-4 bg-gray-800 fixed inset-x-0 bottom-0">
          <p className='text-white'>NIXA 2022</p>
        </footer>
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
