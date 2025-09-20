function getPreviousDate8Digits(previousDays: number) {
  const today = new Date()
  const previousDate = new Date(today)
  previousDate.setDate(previousDate.getDate() - previousDays)

  const year = previousDate.getFullYear()
  const month = String(previousDate.getMonth() + 1).padStart(2, '0')
  const day = String(previousDate.getDate()).padStart(2, '0')

  return `${year}${month}${day}`
}

export { getPreviousDate8Digits }

