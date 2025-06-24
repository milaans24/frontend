import axiosInstance from "../extras/axiosInstance"; // use central axios
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "./Loader";
import MobileBar from "../components/Profile/MobileBar";

const Profile = () => {
  const [ProfileData, setProfileData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useNavigate();
  const backendLink = useSelector((state) => state.prod.link);

  useEffect(() => {
    if (isLoggedIn === false) {
      history("/");
    } else {
      const fetch = async () => {
        try {
          const response = await axiosInstance.get(
            `${backendLink}/api/v1/getUserData`,
            {
              headers: {
                id: localStorage.getItem("id"),
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setProfileData(response.data);
        } catch (err) {
          console.error(err); // token error will be caught in axiosInstance
        }
      };
      fetch();
    }
  }, []);

  return (
    <>
      {!ProfileData && <Loader />}
      <div className="h-auto  px-2 md:px-8 py-8 flex flex-col lg:flex-row gap-4">
        {ProfileData && (
          <>
            <div className="h-auto lg:h-[80vh] w-full lg:w-1/6  md:shadow-xl rounded-lg">
              <Sidebar ProfileData={ProfileData} />
            </div>
            <MobileBar />
            <div className="h-[100%] w-full lg:w-5/6  rounded-lg">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
