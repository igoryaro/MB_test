export const registerUser = async (formData) => {
    try {
      const response = await fetch("http://localhost:3000/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.error };
      }
    } catch (error) {
      return { success: false, message: "Erro ao conectar ao servidor." };
    }
  };