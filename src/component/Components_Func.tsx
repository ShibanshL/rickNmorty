//This function conditionally change the filter options based on the user choice, wether they wanna search
//characters, locations or episodes
const filterInputTags = (
  currentData: any,
  currentButton: string,
  setCData: (e: any) => void
) => {
  if (currentButton == "character") {
    return (
      <>
        <input
          type="text"
          placeholder="name"
          className="h-[55%] w-[25%] outline-none border-[3px] border-gray-300 rounded-md pl-[5px] pr-[5px]"
          onChange={(e: any) =>
            setCData((prevState: any) => {
              prevState.c_data.name = e.target.value;
              return {
                ...prevState,
              };
            })
          }
          value={currentData.c_data.name}
        />
        <select
          className="h-[55%] w-[25%] outline-none border-[3px] border-gray-300 rounded-md pl-[5px] pr-[5px]"
          placeholder="status"
          onChange={(e: any) =>
            setCData((prevState: any) => {
              prevState.c_data.status = e.target.value;
              return {
                ...prevState,
              };
            })
          }
        >
          <option value="" disabled selected hidden>
            status
          </option>
          <option value="alive">alive</option>
          <option value="dead">dead</option>
          <option value="unknown">unknown</option>
        </select>
        <input
          type="text"
          placeholder="species"
          className="h-[55%] w-[25%] outline-none border-[3px] border-gray-300 rounded-md pl-[5px] pr-[5px]"
          onChange={(e: any) =>
            setCData((prevState: any) => {
              prevState.c_data.species = e.target.value;
              return {
                ...prevState,
              };
            })
          }
          value={currentData.c_data.species}
        />
        <input
          type="text"
          placeholder="type"
          className="h-[55%] w-[25%] outline-none border-[3px] border-gray-300 rounded-md pl-[5px] pr-[5px]"
          onChange={(e: any) =>
            setCData((prevState: any) => {
              prevState.c_data.type = e.target.value;
              return {
                ...prevState,
              };
            })
          }
          value={currentData.c_data.type}
        />
        <select
          className="h-[55%] w-[25%] outline-none border-[3px] border-gray-300 rounded-md pl-[5px] pr-[5px]"
          onChange={(e: any) =>
            setCData((prevState: any) => {
              prevState.c_data.gender = e.target.value;
              return {
                ...prevState,
              };
            })
          }
        >
          <option value="" disabled selected hidden>
            gender
          </option>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="genderless">genderless</option>
          <option value="unknown">unknown</option>
        </select>
      </>
    );
  }
  if (currentButton == "location") {
    return (
      <>
        <input
          type="text"
          placeholder="name"
          className="h-[55%] w-[33%] outline-none border-[3px] border-gray-300 rounded-md pl-[5px] pr-[5px]"
          onChange={(e: any) =>
            setCData((prevState: any) => {
              prevState.c_data.name = e.target.value;
              return {
                ...prevState,
              };
            })
          }
          value={currentData.c_data.name}
        />
        <input
          type="text"
          placeholder="type"
          className="h-[55%] w-[34%] outline-none border-[3px] border-gray-300 rounded-md pl-[5px] pr-[5px]"
          onChange={(e: any) =>
            setCData((prevState: any) => {
              prevState.c_data.type = e.target.value;
              return {
                ...prevState,
              };
            })
          }
          value={currentData.c_data.type}
        />
        <input
          type="text"
          placeholder="dimensions"
          className="h-[55%] w-[33%] outline-none border-[3px] border-gray-300 rounded-md pl-[5px] pr-[5px]"
          onChange={(e: any) =>
            setCData((prevState: any) => {
              prevState.c_data.dimensions = e.target.value;
              return {
                ...prevState,
              };
            })
          }
          value={currentData.c_data.dimensions}
        />
      </>
    );
  }
  if (currentButton == "episode") {
    return (
      <>
        <input
          type="text"
          placeholder="name"
          className="h-[55%] w-[50%] outline-none border-[3px] border-gray-300 rounded-md pl-[5px] pr-[5px]"
          onChange={(e: any) =>
            setCData((prevState: any) => {
              prevState.c_data.name = e.target.value;
              return {
                ...prevState,
              };
            })
          }
          value={currentData.c_data.name}
        />
        <input
          type="text"
          placeholder="episodes"
          className="h-[55%] w-[50%] outline-none border-[3px] border-gray-300 rounded-md pl-[5px] pr-[5px]"
          onChange={(e: any) =>
            setCData((prevState: any) => {
              prevState.c_data.episode = e.target.value;
              return {
                ...prevState,
              };
            })
          }
          value={currentData.c_data.episode}
        />
      </>
    );
  }
};

//This function creates the specific object for filter/search params based on the users choice
const checkButton = (currentButton: string, setCData: (e: any) => void) => {
  if (currentButton == "character") {
    let test = {
      current: "character",
      c_data: {
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
      },
    };
    setCData(test);
  }

  if (currentButton == "location") {
    let test = {
      current: "location",
      c_data: {
        name: "",
        type: "",
        dimensions: "",
      },
    };
    setCData(test);
  }

  if (currentButton == "episode") {
    let test = {
      current: "episode",
      c_data: {
        name: "",
        episode: "",
      },
    };
    setCData(test);
  }
};

//This function conditionally render data for the list on useres choice
const dynamicValues = (e: any, currentButton: string) => {
  if (currentButton == "character") {
    return (
      <>
        <h2 className=" font-medium">
          <span
            className={
              e?.status == "Alive"
                ? " text-green-600"
                : e?.status == "Dead"
                ? "text-red-600"
                : ""
            }
          >
            {" "}
            {e?.status}
          </span>{" "}
          , {e?.species}, {e?.gender}
        </h2>
      </>
    );
  }

  if (currentButton == "location") {
    return (
      <>
        <h2 className=" font-medium">
          {e?.type}, {e?.dimension}
        </h2>
      </>
    );
  }

  if (currentButton == "episode") {
    return (
      <>
        <h2 className=" font-medium">
          {e?.episode}, {e?.air_date}
        </h2>
      </>
    );
  }
};

export { filterInputTags, checkButton, dynamicValues };
