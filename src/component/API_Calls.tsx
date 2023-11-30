//This function is to fetch general data from the API
const getData = async (
  currentButton: string,
  currentPage: number,
  setLoading: (e: boolean) => void,
  setData: (e: any) => void
) => {
  setLoading(true);
  let url = `https://rickandmortyapi.com/api/${currentButton}/?page=${currentPage}`;
  let res = await fetch(url);
  let data = await res.json();
  setData(data);
  setLoading(false);
};

//This function is to fetch filtered data from the API based on searchparams
const filteredData = async (
  e: string,
  setLoading: (e: boolean) => void,
  setData: (e: any) => void
) => {
  setLoading(true);
  let res = await fetch(e);
  let data = await res.json();
  setData(data);
  setLoading(false);
};

//This function gets a single object based on id which is unique to every object
const getIndData = async (
  state: any,
  id: string | undefined,
  setLoading: (e: boolean) => void,
  setData: (e: any) => void
) => {
  setLoading(true);
  let url = `https://rickandmortyapi.com/api/${state.data.currentType}/${id}`;
  let res = await fetch(url);
  let final_data = await res.json();
  setData(final_data);
  setLoading(false);
};

export { getData, filteredData, getIndData };
