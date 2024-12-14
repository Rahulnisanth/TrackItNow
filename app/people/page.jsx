"use client";

import { useSession, signOut } from "next-auth/react";
import usePeopleStore from "../../store/peopleStore";
import { useEffect } from "react";

const PeoplePage = () => {
  const { data: session } = useSession();
  const { people, setPeople } = usePeopleStore();

  useEffect(() => {
    if (session?.user) {
      setPeople({
        name: session.user.name,
        email: session.user.email,
      });
    }
  }, [session, setPeople]);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Details</h1>
      {people ? (
        <>
          <p className="text-lg mb-2">Name: {people.name}</p>
          <p className="text-lg mb-4">Email: {people.email}</p>
        </>
      ) : (
        <p>Loading people details...</p>
      )}
    </section>
  );
};

export default PeoplePage;
