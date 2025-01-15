const API_URL = "http://127.0.0.1:8000/api/v1/sessions";

// TODO: Check if it is from the best practice to make a specific endpoint for pagination in backend
export const getAllSessions = async (page = 1, pageSize = 10, days = 0) => {
  const response = await fetch(
    API_URL + `?days=${days}&page=${page}&page_size=${pageSize}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const data = await response.json();
  return data.data;
};

export const createSession = async (data) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });
  const data2 = await response.json();
  return data2;
};


export const deleteSession = async (id) => {

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  return data;
}




