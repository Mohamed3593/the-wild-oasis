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
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("cabins not deleted");
  }
  return data;
}
export async function CreateEditCabin(newCabin, id) {
  const hasImagePath=newCabin.image?.startsWith?.(supabaseUrl)


  // https://wgrnvwyjctktvtqwmeet.supabase.co/storage/v1/object/public/cabins-image/cabin-001.jpg
  const imageName = hasImagePath?null:`${Math.random().toString().replace(".", "")}-${
    newCabin.image.name
  }`;
  const imageURL = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins-image/${imageName}`;

  // 1.Create /edit cabin
  
  let query = supabase.from("cabins")
  // Create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imageURL }]);
  // Edit cabin
if (id)query= query.update({ ...newCabin, image: imageURL }).eq("id", id);

  const {data,error}=await query.select().single()
  if (error) {
    console.log(error);
    throw new Error("cabin nto added into the dataBase");
  }
  // 2. Upload image
  if (hasImagePath) return data; 
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