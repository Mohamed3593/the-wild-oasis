import supabase, { supabaseUrl } from "./supabaseClint";

export async function getCabins() {
    
    let { data, error } = await supabase
    .from('cabins')
        .select('*')
    if (error) {
        console.log(error)
        throw new Error("cabins not loaded")
    }
    return data
} 
export async function deleteCabins(id) {
    
const { data,error } = await supabase
  .from("cabins")
  .delete()
  .eq("id", id);
    if (error) {
        console.log(error)
        throw new Error ("cabins not deleted")
    }
return data
}
export async function addNewCabin(newCabin) {
  // https://wgrnvwyjctktvtqwmeet.supabase.co/storage/v1/object/public/cabins-image/cabin-001.jpg
  const imageName = `${Math.random().toString().replace(".","")}-${newCabin.image.name}`;
  const imageURL = `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`;

  // 1.Create cabin
    const { data, error } = await supabase.from("cabins").insert([{ ...newCabin,image:imageURL }]);
  if (error) {
    console.log(error);
    throw new Error("cabin nto added into the dataBase");
  }
  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabins-image")
    .upload(imageName, newCabin.image);
    // 3. deleted a cabin if errror uploading image
    if (storageError) {
         await supabase
          .from("cabins")
          .delete()
            .eq("id", data.id);
        console.error(storageError)
        throw new Error("cabin could not be created");
    }
  return data;
}