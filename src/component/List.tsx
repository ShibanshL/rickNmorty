import { useEffect, useState } from "react";
import LinkIcon from "../assets/bx_link.svg";
import { Link } from "react-router-dom";
import { filterInputTags, checkButton, dynamicValues } from "./Components_Func";
import { getData, filteredData } from "./API_Calls";

function List() {
  const [data, setData] = useState<any>([]);

  const [currentButton, setB] = useState<string>("character");

  const [items, setItems] = useState<any>([]);

  const [lowerPage, setLowerPage] = useState(0);

  const [upperPage, setUpperPage] = useState(5);

  const [filterApplied, setFilterApplied] = useState(false);

  const [currentPage, setCPage] = useState<number>(1);

  const [loading, setLoading] = useState<boolean>(false);

  // We start with an empty list of items.
  const [currentData, setCData] = useState<any>({
    current: "character",
    c_data: {
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
    },
  });

  //This function is to differentiate between the three options of characters, location and episode, to
  //call the filter fetch function accorfing to the currentButton val
  const filterURL = () => {
    setFilterApplied(true);
    if (currentButton == "character") {
      filteredData(
        `https://rickandmortyapi.com/api/${currentButton}/?page=${currentPage}${
          currentData.c_data.name ? `&name=${currentData.c_data.name}` : ""
        }${
          currentData.c_data.status
            ? `&status=${currentData.c_data.status}`
            : ""
        }${
          currentData.c_data.species
            ? `&species=${currentData.c_data.species}`
            : ""
        }${currentData.c_data.type ? `&type=${currentData.c_data.type}` : ""}${
          currentData.c_data.gender
            ? `&gender=${currentData.c_data.gender}`
            : ""
        }`,
        setLoading,
        setData
      );
    }
    if (currentButton == "location") {
      filteredData(
        `https://rickandmortyapi.com/api/${currentButton}/?page=${currentPage}${
          currentData.c_data.name ? `&name=${currentData.c_data.name}` : ""
        }${currentData.c_data.type ? `&type=${currentData.c_data.type}` : ""}${
          currentData.c_data.dimension
            ? `&dimension=${currentData.c_data.dimension}`
            : ""
        }`,
        setLoading,
        setData
      );
    }

    if (currentButton == "episode") {
      filteredData(
        `https://rickandmortyapi.com/api/${currentButton}/?page=${currentPage}${
          currentData.c_data.name ? `&name=${currentData.c_data.name}` : ""
        }${
          currentData.c_data.episode
            ? `&episode=${currentData.c_data.episode}`
            : ""
        }`,
        setLoading,
        setData
      );
    }
  };

  //This function as the name suggest is to clear all filter params
  const clearFilters = () => {
    setFilterApplied(false);
    if (currentButton == "character") {
      let localVar = {
        current: "character",
        c_data: {
          name: "",
          status: "",
          species: "",
          type: "",
          gender: "",
        },
      };
      setCData(localVar);
    }

    if (currentButton == "location") {
      let localVar = {
        current: "location",
        c_data: {
          name: "",
          type: "",
          dimensions: "",
        },
      };
      setCData(localVar);
    }

    if (currentButton == "episode") {
      let localVar = {
        current: "location",
        c_data: {
          name: "",
          episodes: "",
        },
      };
      setCData(localVar);
    }
    setCPage(1);
    getData(currentButton, currentPage, setLoading, setData);
  };

  //This function takes care of the pagination, it controls the lower and upperlimit of slice method
  //that controls the paginated buttons
  const paginate = () => {
    if (currentPage == upperPage + 1) {
      setLowerPage(lowerPage + 5);
      setUpperPage(upperPage + 5);
    }
    if (currentPage < lowerPage + 1) {
      setLowerPage(lowerPage - 5);
      setUpperPage(upperPage - 5);
    }
    if (!filterApplied) {
      getData(currentButton, currentPage, setLoading, setData);
    }
  };

  //This funciton will all together check if any data is present in the current data variable regarding
  //the filtrer data if so it will hence call filterURL function
  const check_filter = () => {
    for (let test in currentData.c_data) {
      let value = currentData.c_data[test];

      if (value != "") {
        return filterURL();
      }
    }
  };

  //This funcion creates an object based ont the number of pages returned by the api which is
  //is then sliced and mapped through for the pagination buttons
  const paginate_buttons = () => {
    let local_Arr = [];
    if (data?.info?.pages < 5) {
      for (let i = 1; i <= data?.info?.pages; i++) {
        local_Arr.push(i);
        setItems(local_Arr);
      }
    }
    if (data?.info?.pages > 5) {
      for (let i = 1; i <= data?.info?.pages; i++) {
        local_Arr.push(i);
        setItems(local_Arr);
      }
    }
  };

  useEffect(() => {
    checkButton(currentButton, setCData);
    getData(currentButton, currentPage, setLoading, setData);
  }, [currentButton]);

  useEffect(() => {
    paginate();
    check_filter();
  }, [currentPage]);

  useEffect(() => {
    paginate_buttons();
  }, [data]);

  return (
    <div className="h-full w-full flex items-center justify-start flex-col">
      <div className="h-[25%] w-full flex items-center justify-center">
        <div className="h-full w-[15%] max-[640px]:hidden flex items-center justify-center">
          <img src="./rndM.png" alt="err" className=" w-[15vw]" />
        </div>
        <div className="h-full w-[85%] max-[640px]:w-full  flex items-center justify-start flex-col">
          <div className="w-full h-[33%] flex items-center justify-start flex-row pl-[15px]">
            <button
              className={
                currentButton == "character"
                  ? "w-[100px] max-[640px]:w-[33%] h-[60%] bg-black rounded-l-md text-white font-semibold"
                  : "w-[100px] max-[640px]:w-[33%] h-[60%] bg-gray-400 rounded-l-md text-white font-semibold"
              }
              onClick={() => {
                setB("character");
                setCPage(1);
                clearFilters();
              }}
            >
              character
            </button>
            <button
              className={
                currentButton == "location"
                  ? "w-[100px] max-[640px]:w-[30%] h-[60%] bg-black text-white font-semibold"
                  : "w-[100px] max-[640px]:w-[30%] h-[60%] bg-gray-400 text-white font-semibold"
              }
              onClick={() => {
                setB("location");
                setCPage(1);
                clearFilters();
              }}
            >
              locations
            </button>
            <button
              className={
                currentButton == "episode"
                  ? "w-[100px] max-[640px]:w-[33%] h-[60%] bg-black rounded-r-md text-white font-semibold"
                  : "w-[100px] max-[640px]:w-[33%] h-[60%] bg-gray-400 rounded-r-md text-white font-semibold"
              }
              onClick={() => {
                setB("episode");
                setCPage(1);
                clearFilters();
              }}
            >
              episodes
            </button>
          </div>
          <div className="w-full h-[34%] flex items-center justify-stretch gap-[10px] pr-[15px] pl-[15px]">
            {filterInputTags(currentData, currentButton, setCData)}
          </div>
          <div className="w-full h-[33%] flex items-center justify-end flex-row pr-[15px] gap-[20px]">
            <button
              className="w-[120px] h-[60%] bg-black rounded-md text-[0.8em] text-white font-semibold"
              onClick={() => {
                filterURL();
                setCPage(1);
              }}
            >
              APPLY FILTERS
            </button>
            <button
              className="w-[120px] h-[60%] bg-black rounded-md text-[0.8em] text-white font-semibold"
              onClick={clearFilters}
            >
              CLEAR FILTERS
            </button>
          </div>
        </div>
      </div>
      <div className="h-[75%] max-h-[75%] w-full flex items-center justify-start flex-col border-t-4 border-gray-500  overflow-auto rounded-b-xl">
        <div className="h-full max-h-full w-full flex items-center justify-start flex-col border-t-4 border-gray-500  overflow-auto rounded-b-xl">
          {data?.error != "There is nothing here" ? (
            data?.results?.map((e: any) => {
              return (
                <div className="w-full h-[8vh] min-h-[8vh] flex items-center justify-start bg-gray-200 mt-[5px] mb-[5px] p-[10px] hover:bg-white transition">
                  <div className="w-1/2 max-[640px]:w-full flex items-center justify-start gap-[20px]">
                    <Link
                      to={`/individual/${e?.id}`}
                      state={{
                        data: {
                          currentType: currentButton,
                          url:
                            currentButton == "character"
                              ? `https://rickandmortyapi.com/api/${currentButton}/?${
                                  e?.name ? `name=${e?.name}` : ""
                                }${e?.status ? `&status=${e?.status}` : ""}${
                                  e?.species ? `&species=${e?.species}` : ""
                                }${e?.type ? `&type=${e?.type}` : ""}${
                                  e?.gender ? `&gender=${e?.gender}` : ""
                                }`
                              : currentButton == "location"
                              ? `https://rickandmortyapi.com/api/${currentButton}/?${
                                  e?.name ? `name=${e?.name}` : ""
                                }${e?.type ? `&type=${e?.type}` : ""}${
                                  e?.dimension
                                    ? `&dimension=${e?.dimension}`
                                    : ""
                                }`
                              : `https://rickandmortyapi.com/api/${currentButton}/?${
                                  e?.name ? `name=${e?.name}` : ""
                                }${e?.episode ? `&episode=${e?.episode}` : ""}`,
                        },
                      }}
                    >
                      <div className="w-[40px] h-[40px] rounded-md bg-white flex items-center border-4 border-gray-200 justify-center">
                        <img src={LinkIcon} className="w-[30px]" alt="" />
                      </div>
                    </Link>
                    <h2 className="font-bold text-2xl max-[640px]:text-sm">
                      {e?.name}
                    </h2>
                  </div>
                  <div className="w-1/2 max-[640px]:hidden flex items-center justify-end flex-row gap-[20px]">
                    {dynamicValues(e, currentButton)}
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <div className="h-full w-full flex items-center justify-center font-semibold text-3xl">
                No data here!!
              </div>
            </>
          )}
        </div>
      </div>

      <div className="w-full h-[5vh] absolute bottom-[8px] flex items-center justify-center flex-row">
        <button
          className={
            currentPage == 1
              ? "h-[30px] w-[30px] bg-white opacity-50 font-bold rounded-md"
              : "h-[30px] w-[30px] bg-white font-bold rounded-md"
          }
          onClick={() => {
            if (currentPage > 1) {
              setCPage(currentPage - 1);
            }
          }}
          disabled={currentPage == 1 || false}
        >
          {`<`}
        </button>
        {/* {items.map((e: number) => paginate(e))} */}
        {items.slice(lowerPage, upperPage).map((e: number) => {
          return (
            <button
              className={
                currentPage == e
                  ? "h-[30px] w-[30px] bg-black text-white m-[5px] rounded-md"
                  : "h-[30px] w-[30px] bg-white text-black m-[5px] rounded-md"
              }
              onClick={() => {
                setCPage(e);
              }}
            >
              {e}
            </button>
          );
        })}
        <button
          className={
            currentPage == items.length
              ? "h-[30px] w-[30px] bg-white opacity-50 font-bold rounded-md"
              : "h-[30px] w-[30px] bg-white font-bold rounded-md"
          }
          onClick={() => {
            if (currentPage <= items.length) {
              setCPage(currentPage + 1);
            }
          }}
          disabled={currentPage == items.length || false}
        >
          {`>`}
        </button>
      </div>
    </div>
  );
}

export default List;
