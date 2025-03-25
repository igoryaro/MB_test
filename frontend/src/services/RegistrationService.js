export const registerUser = async (formData) => {
  const obj = {
    success: false,
    message: "",
    loading: true,
  };
  try {
    const response = await fetch("http://localhost:3000/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      obj.success = true;
      obj.message = result.message;
      obj.loading = false;
    } else {
      obj.message = result.error;
      obj.loading = false;
    }
    return obj;
  } catch (error) {
    return { success: false, message: "Erro ao conectar ao servidor." };
  }
};
