import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import BackIcon from "../assets/back.svg";

function Individual() {
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  let { state } = useLocation();

  const { id } = useParams();

  //This function gets a single object based on id which is unique to every object
  const getIndData = async () => {
    setLoading(true);
    let url = `https://rickandmortyapi.com/api/${state.data.currentType}/${id}`;
    let res = await fetch(url);
    let final_data = await res.json();
    setData(final_data);
    setLoading(false);
  };

  useEffect(() => {
    getIndData();
  }, []);

  if (loading) {
    return (
      <>
        <div className="w-full h-full flex items-center justify-center">
          LOADING ...
        </div>
      </>
    );
  }

  //This program checks and dynamically allocates the cards based on input props
  const filterFun = () => {
    if (state.data.currentType == "character") {
      return (
        <>
          <div className="w-full h-[30%] flex items-center justify-center ">
            <div className="w-[15%] max-[640px]:hidden h-full flex items-center justify-center">
              <img
                src={data?.image}
                alt="err500"
                className=" w-[80%] rounded-[50%]"
              />
            </div>
            <div className="w-[85%] max-[640px]:w-full h-full flex items-center justify-start max-[640px]:p-[20px]">
              <h1 className=" text-6xl max-[640px]:text-4xl font-bold">
                {data?.name}
              </h1>
            </div>
          </div>
          <div className="w-full h-[70%] flex items-center justify-center bg-gray-100 rounded-b-lg">
            <div className="h-full w-[40%] max-[640px]:w-full flex items-start justify-evenly flex-col gap-[10px] p-[20px]">
              <h2>
                status :{" "}
                <span
                  className={
                    data?.status == "Alive"
                      ? " text-green-600 font-bold text-xl"
                      : data?.status == "Dead"
                      ? "text-red-600 font-bold text-xl"
                      : ""
                  }
                >
                  {data?.status}
                </span>
              </h2>
              <h2>
                species :{" "}
                <span className={"font-bold text-xl"}>{data?.species}</span>
              </h2>
              <h2>
                gender :{" "}
                <span className={"font-bold text-xl"}>{data?.gender}</span>
              </h2>
              <h2>
                type :{" "}
                <span className={"font-bold text-xl"}>
                  {data?.type ? data?.type : "unknown"}
                </span>
              </h2>
              <h2>
                origin :{" "}
                <span className={"font-bold text-xl"}>
                  {data?.origin?.name}
                </span>
              </h2>
              <h2>
                location :{" "}
                <span className={"font-bold text-xl"}>
                  {data?.location?.name}
                </span>
              </h2>
            </div>
            <div className="h-full w-[60%] max-[640px]:hidden flex items-center justify-start flex-col p-[15px]">
              <h1 className="text-2xl font-semibold">
                List of episodes featured in
              </h1>
              <div className="h-[100%] max-h-[100%] mt-[10px] w-[90%] bg-white rounded-lg flex items-center justify-start flex-col overflow-hidden">
                <div className="h-[100%] max-h-[100%] w-full bg-white rounded-md flex items-center justify-start flex-col overflow-auto overflow-x-hidden">
                  {data?.episode?.map((e: string) => {
                    return (
                      <>
                        <h2 className="text-2xl font-bold p-10px w-full h-[40px] bg-gray-200 hover:bg-white cursor-default m-[5px] text-center">
                          {e}
                        </h2>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <BackButton />
        </>
      );
    }
    if (state.data.currentType == "location") {
      return (
        <>
          <div className="w-full h-[30%] flex items-center justify-center ">
            <div className="w-full h-full flex items-center justify-start pl-[20px]">
              <h1 className=" text-6xl max-[640px]:text-4xl font-bold">
                {data?.name}
              </h1>
            </div>
          </div>
          <div className="w-full h-[70%] flex items-center justify-center bg-gray-100 rounded-b-lg">
            <div className="h-full w-[40%] max-[640px]:w-full flex items-start justify-evenly flex-col gap-[10px] p-[20px]">
              <h2>
                type :{" "}
                <span className={"font-bold text-xl"}>
                  {data?.type ? data?.type : "unknown"}
                </span>
              </h2>
              <h2>
                dimension :{" "}
                <span className={"font-bold text-xl"}>{data?.dimension}</span>
              </h2>
              <h2>
                created :{" "}
                <span className={"font-bold text-xl"}>{data?.created}</span>
              </h2>
            </div>
            <div className="h-full w-[60%] max-[640px]:hidden flex items-center justify-start flex-col p-[15px]">
              <h1 className="text-2xl font-semibold">List of residents</h1>
              <div className="h-[100%] max-h-[100%] mt-[10px] w-[90%] bg-white rounded-lg flex items-center justify-start flex-col overflow-hidden">
                <div
                  className={`h-[100%] max-h-[100%] w-full bg-white rounded-md flex items-center justify-${
                    data?.residents?.length > 0 ? "start" : "center"
                  } flex-col overflow-auto overflow-x-hidden`}
                >
                  {data?.residents?.length > 0
                    ? data?.residents?.map((e: string) => {
                        return (
                          <>
                            <h2 className="text-2xl font-bold p-10px w-full h-[40px] bg-gray-200 hover:bg-white cursor-default m-[5px] text-center">
                              {e}
                            </h2>
                          </>
                        );
                      })
                    : "NO data present"}
                </div>
              </div>
            </div>
          </div>
          <BackButton />
        </>
      );
    }
    if (state.data.currentType == "episode") {
      return (
        <>
          <div className="w-full h-[30%] flex items-center justify-center ">
            <div className="w-full h-full flex items-center justify-start pl-[20px]">
              <h1 className=" text-6xl max-[640px]:text-4xl font-bold">
                {data?.name}
              </h1>
            </div>
          </div>
          <div className="w-full h-[70%] flex items-center justify-center bg-gray-100 rounded-b-lg">
            <div className="h-full w-[40%] max-[640px]:w-full flex items-start justify-evenly flex-col gap-[10px] p-[20px]">
              <h2>
                air_date :{" "}
                <span className={"font-bold text-xl"}>
                  {data?.air_date ? data?.air_date : "unknown"}
                </span>
              </h2>
              <h2>
                episode :{" "}
                <span className={"font-bold text-xl"}>{data?.episode}</span>
              </h2>
              <h2>
                created :{" "}
                <span className={"font-bold text-xl"}>{data?.created}</span>
              </h2>
            </div>
            <div className="h-full w-[60%] max-[640px]:hidden flex items-center justify-start flex-col p-[15px]">
              <h1 className="text-2xl font-semibold">List of residents</h1>
              <div className="h-[100%] max-h-[100%] mt-[10px] w-[90%] bg-white rounded-lg flex items-center justify-start flex-col overflow-hidden">
                <div
                  className={`h-[100%] max-h-[100%] w-full bg-white rounded-md flex items-center justify-${
                    data?.characters?.length > 0 ? "start" : "center"
                  } flex-col overflow-auto overflow-x-hidden`}
                >
                  {data?.characters?.length > 0
                    ? data?.characters?.map((e: string) => {
                        return (
                          <>
                            <h2 className="text-2xl font-bold p-10px w-full h-[40px] bg-gray-200 hover:bg-white cursor-default m-[5px] text-center">
                              {e}
                            </h2>
                          </>
                        );
                      })
                    : "NO data present"}
                </div>
              </div>
            </div>
          </div>
          <BackButton />
        </>
      );
    }
  };

  return (
    <>
      <div className="w-full h-full flex items-center justify-center flex-col  relative">
        {filterFun()}
      </div>
    </>
  );
}

//This button component was the same for every card so just made an independent component and called it wherevr it was required
const BackButton = () => {
  return (
    <>
      <div className="absolute top-[20px] right-[25px] max-[640px]:top-[10px] max-[640px]:right-[10px] text-2xl h-[30px] w-[30px] bg-black text-white font-bold rounded-lg">
        <Link to="/">
          <div className="text-2xl h-full w-full bg-black text-white font-bold rounded-lg flex items-center justify-center">
            <img src={BackIcon} className="w-[50%]" alt="" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Individual;
