import supabase, { supabaseUrl } from "./supabaseClint";

export async function signin({email,password,fullName}) {
  let { data, error } = await supabase.auth.signUp({
    email, password, options: {
      data: {
        fullName,avatar:""
      }
    }
  })
  if (error) throw new Error(error.message)
  return data
} 
export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
    return data ;
}
 
export async function getUser() {
    const { data:session } = await supabase.auth.getSession()
    if (!session.session) return null
    const { data, error } = await supabase.auth.getUser()
    if (error)
        throw new Error(error.message)
    return data?.user
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error)
    throw new Error(error.message)
}
export async function updateCurrentUser({ fullName, password, avatar }) {
  let updateData
  if (password) updateData = { password }
  if(fullName) updateData = { data: { fullName } };
  //1 update password or current name 
  const { data, error } = await supabase.auth.updateUser( updateData )
  if (error) throw new Error(error.message)
  if (!avatar)return data;
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage.from("avatar").upload(fileName, avatar)
  if (storageError) throw new Error(storageError.message)
  // uplead the avatar in user
  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      fullName: fullName || data.user.user_metadata?.fullName,
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message)
  return updateUser
  
} 