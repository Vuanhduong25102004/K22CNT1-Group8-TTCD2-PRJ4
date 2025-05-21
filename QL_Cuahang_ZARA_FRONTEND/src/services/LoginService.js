const API_URL = "http://localhost:8080/auth";

export async function login(email, matKhau) {
    const response = await fetch(`${API_URL}/login`, {  // chú ý đúng endpoint
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, matKhau }),  // gửi đúng key matKhau
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    console.log("Login success");

    return;
}
