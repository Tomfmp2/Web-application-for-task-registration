import { obtenerNotas, crearNota, actualizarNota, eliminarNota } from "./api/api-mokapi.js"

// DOM Elements
const notaInput = document.getElementById("nota-agregada")
const agregarBtn = document.getElementById("agregar-nota")
const notasContainer = document.getElementById("notas")
const emptyState = document.getElementById("empty-state")
const notesCount = document.getElementById("notes-count")
const particlesContainer = document.getElementById("particles")

// State
let notas = []

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  createParticles()
  await cargarNotas()
})

// Load notes from API
async function cargarNotas() {
  try {
    notas = await obtenerNotas()
    renderNotas()
  } catch (error) {
    console.error("Error al cargar notas:", error)
  }
}

// Create floating particles
function createParticles() {
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 15 + "s"
    particle.style.animationDuration = 15 + Math.random() * 10 + "s"
    particlesContainer.appendChild(particle)
  }
}

// Add note
agregarBtn.addEventListener("click", agregarNota)
notaInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") agregarNota()
})

async function agregarNota() {
  const texto = notaInput.value.trim()
  if (!texto) {
    notaInput.classList.add("shake")
    setTimeout(() => notaInput.classList.remove("shake"), 500)
    return
  }

  const nuevaNota = {
    Note: texto,
    underlined: false,
  }

  try {
    // Crear nota en MockAPI
    const notaCreada = await crearNota(nuevaNota)

    // Agregar al estado local
    notas.unshift(notaCreada)
    renderNotas()
    notaInput.value = ""
    notaInput.focus()
  } catch (error) {
    console.error("Error al agregar nota:", error)
    alert("Error al agregar la nota. Por favor intenta de nuevo.")
  }
}

// Render notes
function renderNotas() {
  // Update count
  const count = notas.length
  notesCount.textContent = `${count} ${count === 1 ? "nota" : "notas"}`

  // Show/hide empty state
  if (notas.length === 0) {
    emptyState.classList.remove("hidden")
    return
  }

  emptyState.classList.add("hidden")

  // Clear and render
  const notasHTML = notas
    .map(
      (nota, index) => `
        <article class="nota-card ${nota.underlined ? "completed" : ""}" data-id="${nota.id}" style="animation-delay: ${index * 0.05}s">
            <button class="nota-checkbox ${nota.underlined ? "checked" : ""}" onclick="toggleNota('${nota.id}')" aria-label="Marcar como subrayada">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </button>
            <span class="nota-texto">${escapeHTML(nota.Note)}</span>
            <button class="nota-eliminar" onclick="eliminarNotaHandler('${nota.id}')" aria-label="Eliminar nota">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
            </button>
        </article>
    `,
    )
    .join("")

  // Keep empty state in DOM but update notes
  notasContainer.innerHTML =
    `<div class="empty-state hidden" id="empty-state">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
            <polyline points="14 2 14 8 20 8"/>
        </svg>
        <p>No hay notas todavia</p>
        <span>Comienza agregando tu primera tarea</span>
    </div>` + notasHTML
}

// Toggle note underlined state
window.toggleNota = async (id) => {
  const nota = notas.find((n) => n.id == id)
  if (nota) {
    try {
      // Actualizar en MockAPI
      const notaActualizada = await actualizarNota(id, {
        ...nota,
        underlined: !nota.underlined,
      })

      // Actualizar estado local
      nota.underlined = notaActualizada.underlined
      renderNotas()
    } catch (error) {
      console.error("Error al actualizar nota:", error)
      alert("Error al actualizar la nota. Por favor intenta de nuevo.")
    }
  }
}

// Delete note
window.eliminarNotaHandler = async (id) => {
  const card = document.querySelector(`[data-id="${id}"]`)
  if (card) {
    card.classList.add("deleting")

    try {
      // Eliminar de MockAPI
      await eliminarNota(id)

      // Esperar animación y actualizar estado
      setTimeout(() => {
        notas = notas.filter((n) => n.id != id)
        renderNotas()
      }, 400)
    } catch (error) {
      console.error("Error al eliminar nota:", error)
      card.classList.remove("deleting")
      alert("Error al eliminar la nota. Por favor intenta de nuevo.")
    }
  }
}

// Escape HTML
function escapeHTML(str) {
  const div = document.createElement("div")
  div.textContent = str
  return div.innerHTML
}

// Add shake animation CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
    }
    .shake {
        animation: shake 0.4s ease-in-out;
        border-color: #ef4444 !important;
    }
`
document.head.appendChild(style)