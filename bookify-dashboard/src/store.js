import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

const useTokenStore = create(
  devtools(
    persist(
      (set) => ({
        token: "",
        setToken: (data) => set({ token: data }), // Fix here
      }),
      { name: "token-store" }
    )
  )
);

export default useTokenStore;
