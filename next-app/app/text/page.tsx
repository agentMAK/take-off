import { createClient } from "../utils/supabase/server";

export default async function Votes() {
  const supabase = createClient();
  const { data } = await supabase.from("votes").select();
  const { error } = await supabase
    .from("votes")
    .insert({ applicant_address: "0xccdd", campaign:"ethlondon" });

    console.log(error)

  return <pre>{JSON.stringify(error, null, 2)}</pre>;
}
