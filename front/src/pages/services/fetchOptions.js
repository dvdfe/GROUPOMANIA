const url = "http://localhost:3001/"

const headers = {
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Accept": "application/json"
}

function getUrlAndHeaders() {
  return {
    url,
    headers
  }
}

export { getUrlAndHeaders }