const API_URL = "https://6925b48882b59600d724d243.mockapi.io/Nota-Usuarios"

/**
 * Obtener todas las notas desde MockAPI
 * @returns {Promise<Array>} Array de notas
 */
export async function obtenerNotas() {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error("Error al obtener notas")
    return await response.json()
  } catch (error) {
    console.error("Error al obtener notas:", error)
    return []
  }
}

/**
 * Crear una nueva nota en MockAPI
 * @param {Object} nota - Objeto con los datos de la nota
 * @returns {Promise<Object>} La nota creada con su ID
 */
export async function crearNota(nota) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nota),
    })
    if (!response.ok) throw new Error("Error al crear nota")
    return await response.json()
  } catch (error) {
    console.error("Error al crear nota:", error)
    throw error
  }
}

/**
 * Actualizar una nota existente en MockAPI
 * @param {string|number} id - ID de la nota a actualizar
 * @param {Object} datos - Datos a actualizar
 * @returns {Promise<Object>} La nota actualizada
 */
export async function actualizarNota(id, datos) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    })
    if (!response.ok) throw new Error("Error al actualizar nota")
    return await response.json()
  } catch (error) {
    console.error("Error al actualizar nota:", error)
    throw error
  }
}

/**
 * Eliminar una nota de MockAPI
 * @param {string|number} id - ID de la nota a eliminar
 * @returns {Promise<Object>} Confirmación de eliminación
 */
export async function eliminarNota(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Error al eliminar nota")
    return await response.json()
  } catch (error) {
    console.error("Error al eliminar nota:", error)
    throw error
  }
}