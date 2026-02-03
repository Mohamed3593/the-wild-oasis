import { pageSize } from "../utils/constance";
import supabase from "./supabaseClint";

export async function getGuests({page}) {
  let query= supabase.from("guests").select("*", { count: "exact" });
if (page) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);
}
const { data, error, count } = await query;
  if (error) {
    console.log(error);
    throw new Error("guests not loaded");
  }
  return { data, count };
}
export async function addGuest(newGuest) {
  const { data: guests, error } = await supabase.from("guests").insert([newGuest])
  if (error) {
    console.log(error);
    throw new Error("guests not loaded");
  }
  return guests;
}
export async function editGuest({ id, ...newGuest }) {
  const { data: guests, error } = await supabase
    .from("guests")
    .update(newGuest)
    .eq("id", id)
    .select();
  if (error) {
    console.log(error);
    throw new Error("guests not updated");
  }
  return guests;
}
export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id",id)
  if (error) {
    console.log(error);
    throw new Error("guests not updated");
  }
  return data;
}
