function generateRandomId() {
  return `${Date.now()}-${Math.random().toString(36)}`
}

function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export { generateRandomId, generateRandomInt }

