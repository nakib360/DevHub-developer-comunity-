const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)

const signUpWithEmailAndPass = async (email, pass) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: pass,
        options: {
            emailRedirectTo: "http://localhost:3000/"
        }
    })
}

export { signUpWithEmailAndPass };