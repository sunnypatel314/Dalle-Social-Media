import { useEffect, useState } from "react";
import Card from "../components/Card";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useNavigate } from "react-router-dom";

const RenderCards = ({ data, user }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} user={user} />);
  }
  return;
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [startingList, setStartingList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState("");
  const [myPostsOnlyCheckbox, setMyPostsOnlyCheckbox] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const searchResults = startingList.filter(
      (item) =>
        item.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
        item.prompt.toLowerCase().startsWith(searchText.toLowerCase())
    );
    setAllPosts(searchResults);
  }, [searchText]);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/log-in");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          if (myPostsOnlyCheckbox) {
            setAllPosts(
              result.data.reverse().filter((post) => post.name == user)
            );
            setStartingList(
              result.data.reverse().filter((post) => post.name == user)
            );
          } else {
            setAllPosts(result.data.reverse());
            setStartingList(result.data.reverse());
          }

          setUser(result.user);
        }
      } catch (error) {
        //localStorage.removeItem("token");
        console.log(error.message);
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [myPostsOnlyCheckbox]);

  return (
    <>
      <header
        className="w-full flex justify-between items-center bg-white sm:px-8
          px-4 py-4 border-b border-b-[#e6ebf4]"
      >
        <Link to={"/"}>
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        {user ? (
          <div className="flex flex-row justify-between space-x-3">
            <Link
              to={"/create-post"}
              className="font-inter font-semibold bg-green-500 text-white py-2 
          px-4 rounded-md hover:cursor-pointer hover:bg-green-700"
            >
              Create Post
            </Link>
            <button
              onClick={logOut}
              className="font-inter font-semibold bg-blue-500 text-white py-2 
        px-4 rounded-md hover:cursor-pointer hover:bg-blue-700"
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="flex flex-row justify-between space-x-3">
            <Link
              to={"/sign-up"}
              className="font-inter font-semibold bg-green-500 text-white py-2 
          px-4 rounded-md hover:cursor-pointer hover:bg-green-700"
            >
              Sign Up
            </Link>
            <Link
              to={"/log-in"}
              className="font-inter font-semibold bg-blue-500 text-white py-2 
          px-4 rounded-md hover:cursor-pointer hover:bg-blue-700"
            >
              Log In
            </Link>
          </div>
        )}
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <section className="w-full mx-auto">
          <div>
            <h1 className="font-extrabold text-[#222328] text-center text-[32px]">
              Welcome {user}, to the Community Showcase
            </h1>
            <p className="mt-2 text-[#666e75] text-[14px] text-center">
              Browse through a collection of imaginative and visually stunning
              images generated by DALL-E AI
            </p>
          </div>

          <div className="mt-10 flex flex-row items-center justify-center w-full">
            <div className="w-3/4">
              <div className="w-2/3 ml-auto">
                <FormField
                  labelName=""
                  type="text"
                  name="text"
                  placeholder="Search posts or creators..."
                  value={searchText}
                  handleChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="w-1/4 flex flex-row items-center justify-center space-x-4">
              <h3 className="font-semibold text-[14px]">My Posts Only</h3>
              <input
                className="w-6 h-6 hover:cursor-pointer"
                type="checkbox"
                checked={myPostsOnlyCheckbox}
                onChange={() => {
                  setMyPostsOnlyCheckbox(!myPostsOnlyCheckbox);
                }}
              />
            </div>
          </div>

          <div className="mt-5">
            {loading ? (
              <div className="flex justify-between items-center">
                <Loader />
              </div>
            ) : (
              <>
                {searchText && (
                  <h2 className="font-medium text-center text-gray-600 text-xl mb-3">
                    Showing Resuls for{" "}
                    <span className="text-[#222328] font-semibold">
                      {searchText}
                    </span>
                    :
                  </h2>
                )}

                {allPosts.length == 0 ? (
                  <h2 className="mt-5 text-center font-bold text-[#6469ff] text-xl uppercase">
                    {user
                      ? "No posts found"
                      : "Sign in to view and create images"}
                  </h2>
                ) : (
                  <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                    <RenderCards data={allPosts} user={user} />
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
