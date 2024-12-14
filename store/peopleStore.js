import { create } from "zustand";

const usePeopleStore = create((set) => ({
  people: null,
  setPeople: (people) => set({ people }),
}));

export default usePeopleStore;
