'use client'

import Loading from "@/component/Loading";
import { useAuth, useTokenStore } from "@/store/useAuth";
import useMenu from "@/store/useMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

export default function Home() {
  const router = useRouter();
  const { data, pagination, error, fetchData, currentPage, loading } = useMenu(useShallow((state) => ({ data: state.data, pagination: state.pagination, error: state.error, fetchData: state.fetchData, currentPage: state.currentPage, loading: state.loading })));
  const { token } = useTokenStore()

  useEffect(() => {
    fetchData(currentPage);
  }, [fetchData, currentPage]);

  return (
    <>
      <h1 className="text-3xl font-bold">Ini adalah menu</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex">
          {data.map((menu) => (
            <div className="flex flex-col gap-2 w-60 bg-white text-black p-4 m-2 radius" key={menu.id}>
              <p className="text-xl font-bold">{menu.name}</p>
              <p className="text-lg">$ {menu.price}</p>
              <p className="text-sm">{menu.description}</p>
            </div>
          ))}
        </div>
      )}
      {/* <p>{token}</p> */}
      <div className="flex justify-center m-4 gap-4">
        <button disabled={!pagination.previousPage} className="bg-white text-blue-700 font-bold p-2 w-24 text-lg disabled:bg-gray-400" onClick={() => fetchData(pagination.previousPage)}>Prev</button>
        <button disabled={!pagination.nextPage} className="bg-white text-blue-700 font-bold p-2 w-24 text-lg disabled:bg-gray-400" onClick={() => fetchData(pagination.nextPage)}>Next</button>
      </div>
    </>
  );
}
