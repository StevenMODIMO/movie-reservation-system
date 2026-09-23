import type { Metadata } from "next";
import AddMovieForm from "../../../components/add-movie-form";

export const metadata: Metadata = {
  title: "New movie",
};

export default function New() {
  return (
    <div>
      <AddMovieForm />
    </div>
  );
}
