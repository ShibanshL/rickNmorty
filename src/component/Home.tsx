import { BrowserRouter, Route, Routes } from "react-router-dom";

import List from "./List";
import Individual from "./Individual";

function Home() {
  return (
    <div className="h-full w-full  backdrop-blur-lg flex items-center justify-center flex-col ">
      <div className="h-[85%] w-[95%] bg-white rounded-xl flex items-center justify-center flex-col">
        <div className="h-full w-full flex items-center justify-center flex-col">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<List />} />
              <Route path="/individual/:id" element={<Individual />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default Home;
