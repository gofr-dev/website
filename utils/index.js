export function formatGitHubStars(key = 'githubStars') {
  try {
    // Check if localStorage is available
    if (typeof localStorage === 'undefined') {
      return '3000+'
    }

    // Get value from localStorage
    const storedValue = localStorage.getItem(key)

    // If key doesn't exist or value is null/undefined/empty
    if (!storedValue) {
      return '3000+'
    }

    const stars = Number(storedValue)

    // If conversion to number failed or is invalid
    if (isNaN(stars) || stars < 0) {
      return '3000+'
    }

    // Handle different ranges
    if (stars < 1000) {
      return `${Math.floor(stars / 10) * 10}+`
    } else {
      return `${Math.floor(stars / 500) * 500}+`
    }
  } catch (error) {
    // Return default value if any error occurs
    return '3000+'
  }
}
