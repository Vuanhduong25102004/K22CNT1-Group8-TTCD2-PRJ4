const API_URL = "http://localhost:8080/auth";

export async function login(email, matKhau) {
    console.log("Calling API with:", { email, matKhau });

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, matKhau }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response data:", errorData);
        throw new Error(errorData.error || "Login failed");
    }

    const data = await response.json();
    console.log("Login success", data);

    if (!data.token) {
        console.error("Missing token in response", data);
        throw new Error("Token not found in response");
    }

    return data.token;
}