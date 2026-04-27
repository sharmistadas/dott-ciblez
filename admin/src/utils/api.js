const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const buildHeaders = (headers = {}, withAuth = true, isFormData = false) => {
  const finalHeaders = { ...headers };

  if (!isFormData && !('Content-Type' in finalHeaders)) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  if (withAuth) {
    const token = localStorage.getItem('adminToken');
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  return finalHeaders;
};

export const apiRequest = async (path, options = {}) => {
  const { body, headers, withAuth = true, ...rest } = options;
  const hasBody = body !== undefined && body !== null;
  const isFormData = hasBody && typeof FormData !== 'undefined' && body instanceof FormData;
  const payload = hasBody && typeof body === 'object' && !isFormData ? JSON.stringify(body) : body;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: buildHeaders(headers, withAuth, isFormData),
    body: payload,
    credentials: 'include',
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || 'Request failed. Please try again.';
    throw new Error(message);
  }

  return data;
};

export const apiBaseUrl = API_BASE_URL;
