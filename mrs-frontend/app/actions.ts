"use server"

const API = process.env.NEXT_PUBLIC_BACKEND_API_URL

export async function login(formData: FormData) {
    const email = formData.get("email")
    const password = formData.get("password")
try {
    const payload = new FormData()
    payload.append("username", email)
    payload.append("password", password)
    const res = await fetch(`${API}/api/users/login`, {
        method: "POST",
        body: payload
    })

    const json = await res.json()

    if(!res.ok) {
        console.log(json)
    } else {
        console.log(json)
    }
} catch(error) {
    console.log(error)
}
}