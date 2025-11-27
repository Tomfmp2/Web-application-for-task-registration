import "./api/api-mokapi.js"

// DOM Elements
const notaInput = document.getElementById("nota-agregada")
const agregarBtn = document.getElementById("agregar-nota")
const notasContainer = document.getElementById("notas")
const emptyState = document.getElementById("empty-state")
const notesCount = document.getElementById("notes-count")
const particlesContainer = document.getElementById("particles")

// State
let notas = JSON.parse(localStorage.getItem("notas")) || []

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  createParticles()
  renderNotas()
})

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

function agregarNota() {
  const texto = notaInput.value.trim()
  if (!texto) {
    notaInput.classList.add("shake")
    setTimeout(() => notaInput.classList.remove("shake"), 500)
    return
  }

  const nota = {
    id: Date.now(),
    texto,
    completada: false,
    fecha: new Date().toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    }),
  }

  notas.unshift(nota)
  guardarNotas()
  renderNotas()
  notaInput.value = ""
  notaInput.focus()
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
        <article class="nota-card ${nota.completada ? "completed" : ""}" data-id="${nota.id}" style="animation-delay: ${index * 0.05}s">
            <button class="nota-checkbox ${nota.completada ? "checked" : ""}" onclick="toggleNota(${nota.id})" aria-label="Marcar como completada">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
            </button>
            <span class="nota-texto">${escapeHTML(nota.texto)}</span>
            <span class="nota-fecha">${nota.fecha}</span>
            <button class="nota-eliminar" onclick="eliminarNota(${nota.id})" aria-label="Eliminar nota">
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

// Toggle note completion
window.toggleNota = (id) => {
  const nota = notas.find((n) => n.id === id)
  if (nota) {
    nota.completada = !nota.completada
    guardarNotas()
    renderNotas()
  }
}

// Delete note
window.eliminarNota = (id) => {
  const card = document.querySelector(`[data-id="${id}"]`)
  if (card) {
    card.classList.add("deleting")
    setTimeout(() => {
      notas = notas.filter((n) => n.id !== id)
      guardarNotas()
      renderNotas()
    }, 400)
  }
}

// Save to localStorage
function guardarNotas() {
  localStorage.setItem("notas", JSON.stringify(notas))
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
